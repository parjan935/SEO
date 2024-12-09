from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import whisper
import google.generativeai as genai
import subprocess
import io
import soundfile as sf
import tempfile
from flask_cors import CORS
import logging
import json
from googleapiclient.discovery import build

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

load_dotenv()

if not os.getenv("GOOGLE_API_KEY"):
    logger.error("API key not set")
    exit(1)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

api_key = os.getenv("YOUTUBE_API_KEY")
youtube = build('youtube', 'v3', developerKey=api_key)

prompt = """
You are an expert Search Engine Optimizer. Analyze the given video transcript and provide:
1. A concise summary of the video content (50-75 words)
2. 5-7 important keywords relevant to the video content
3. 3-5 relevant hashtags for social media promotion
4. 2-3 suggestions for optimizing the video title for SEO
Format the output clearly with appropriate headings for each section and return as {"Summary": summary text, "Keywords": list of keywords, "Hashtags": list of hashtags, "Titles": list of titles} so I can access by using response.Summary.
"""

model = whisper.load_model("base")

def extract_transcript_details(video_file_path):
    try:
        command = [
            "ffmpeg",
            "-i",
            video_file_path,
            "-q:a",
            "0",
            "-f",
            "wav",
            "-ac",
            "1",
            "-ar",
            "16000",
            "pipe:1"
        ]
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        audio_data, _ = process.communicate()
        audio, _ = sf.read(io.BytesIO(audio_data), dtype='float32')
        result = model.transcribe(audio)
        return result['text']
    except Exception as e:
        logger.error(f"Error extracting transcript: {str(e)}")
        return None

def generate_gemini_content(transcript_text, prompt):
    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt + transcript_text)
        return json.loads(response.text)
    except Exception as e:
        logger.error(f"Error generating content: {str(e)}")
        return None

def search_videos_by_keyword(keyword, max_results=5):
    search_response = youtube.search().list(
        q=keyword,
        part="id",
        type="video",
        maxResults=max_results
    ).execute()
    video_ids = [item['id']['videoId'] for item in search_response['items']]
    return video_ids

def get_video_details(video_ids):
    video_response = youtube.videos().list(
        id=','.join(video_ids),
        part='statistics'
    ).execute()
    video_details = []
    for item in video_response['items']:
        video_info = {
            'videoId': item['id'],
            'views': int(item['statistics']['viewCount'])
        }
        video_details.append(video_info)
    print(video_details)
    return video_details

@app.route('/process_video', methods=['POST'])
def process_video():
    try:
        if 'video' not in request.files:
            return jsonify({'error': 'No video file uploaded'}), 400
        video = request.files['video']
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
            video.save(temp_file.name)
            temp_video_path = temp_file.name
        
        logger.info(f"Processing video: {temp_video_path}")
        transcript_text = extract_transcript_details(temp_video_path)
        if transcript_text is None:
            return jsonify({'error': 'Failed to extract transcript'}), 500
        
        logger.info(f"Transcript extracted: {transcript_text[:100]}")
        seo_data = generate_gemini_content(transcript_text, prompt)
        if seo_data is None:
            return jsonify({'error': 'Failed to generate SEO suggestions'}), 500
        
        logger.info(f"SEO suggestions generated: {seo_data['Summary'][:100]}")
        keyword_to_video_ids = {}
        for keyword in seo_data['Keywords']:
            video_ids = search_videos_by_keyword(keyword)
            video_details = get_video_details(video_ids)
            total_views = sum([video['views'] for video in video_details])
            keyword_to_video_ids[keyword] = total_views
        ranked_keywords = sorted(keyword_to_video_ids.items(), key=lambda x: x[1], reverse=True)
        response_data = {
            "Summary": seo_data['Summary'],
            "Keywords": [keyword for keyword, _ in ranked_keywords],
            "Hashtags": seo_data['Hashtags'],
            "Titles": seo_data['Titles']
        }
        print(response_data)
        return jsonify(response_data)
    except Exception as e:
        logger.error(f"Error processing video: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(temp_video_path)
        logger.info(f"Temporary file deleted: {temp_video_path}")

if __name__ == '__main__':
    app.run(debug=True)
