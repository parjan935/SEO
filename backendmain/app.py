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
import requests  # To make internal requests
import json

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Validate API key
if not os.getenv("GOOGLE_API_KEY"):
    logger.error("API key not set")
    exit(1)

# Configure Google Gemini Pro with API Key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Prompt for Gemini Pro
prompt = """
You are an expert Search Engine Optimizer. Analyze the given video transcript and provide:
1. A concise summary of the video content (50-75 words)
2. 5-7 important keywords relevant to the video content
3. 3-5 relevant hashtags for social media promotion
4. 2-3 suggestions for optimizing the video title for SEO
Format the output clearly with appropriate headings for each section and return(not a JSON)  as {"Summary":summmary text,"Keywords":list of keywords,"Hashtags":list of hashtags,"Titles": list of titles} so i can access by using response.Summary.
"""

# Initialize Whisper Model
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
        return response.text
    except Exception as e:
        logger.error(f"Error generating content: {str(e)}")
        return None




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
        
        summary = generate_gemini_content(transcript_text, prompt)
        if summary is None:
            return jsonify({'error': 'Failed to generate SEO suggestions'}), 500
        
        logger.info(f"SEO suggestions generated: {summary[:100]}")

        return summary

    except Exception as e:
        logger.error(f"Error processing video: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
    finally:
        os.remove(temp_video_path)
        logger.info(f"Temporary file deleted: {temp_video_path}")

if __name__ == '__main__':
    app.run(debug=True)
#integrated 
