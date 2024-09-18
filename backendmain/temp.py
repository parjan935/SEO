from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import os
import whisper
import google.generativeai as genai
import subprocess
import io
import soundfile as sf
import tempfile

app = Flask(__name__)

# Load environment variables
load_dotenv()

# Configure Google Gemini Pro with API Key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Prompt for Gemini Pro
prompt = """You are an expert Search Engine Optimizer. Analyze the given video transcript and provide:
1. A concise summary of the video content (50-75 words)
2. 5-7 important keywords relevant to the video content
3. 3-5 relevant hashtags for social media promotion
4. 2-3 suggestions for optimizing the video title for SEO
Format the output clearly with appropriate headings for each section."""

# Initialize Whisper Model
model = whisper.load_model("base")

def extract_transcript_details(video_file_path):
    try:
        command = [
            "ffmpeg", "-i", video_file_path, "-q:a", "0", "-f", "wav", "-ac", "1", "-ar", "16000", "pipe:1"
        ]
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        audio_data, _ = process.communicate()
        
        audio, _ = sf.read(io.BytesIO(audio_data), dtype='float32')
        result = model.transcribe(audio)
        return result['text']
    except Exception as e:
        print(f"Error extracting transcript: {str(e)}")
        return None

def generate_gemini_content(transcript_text, prompt):
    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt + transcript_text)
        return response.text
    except Exception as e:
        print(f"Error generating content: {str(e)}")
        return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_video', methods=['POST'])
def process_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file uploaded'}), 400
    
    video = request.files['video']
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
        video.save(temp_file.name)
        temp_video_path = temp_file.name

    try:
        transcript_text = extract_transcript_details(temp_video_path)

        if transcript_text:
            summary = generate_gemini_content(transcript_text, prompt)
            if summary:
                return jsonify({'summary': summary})
            else:
                return jsonify({'error': 'Failed to generate SEO suggestions'}), 500
        else:
            return jsonify({'error': 'Failed to extract transcript'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(temp_video_path)

if __name__ == '__main__':
    app.run(debug=True)