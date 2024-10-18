

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
import redis
import hashlib

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()
# Prompt for Gemini Pro
prompt = """
You are an expert Search Engine Optimizer. Analyze the given video transcript and provide:
1. A concise summary of the video content (50-75 words)
2. 5-7 important keywords relevant to the video content
3. 3-5 relevant hashtags for social media promotion
4. 2-3 suggestions for optimizing the video title for SEO
Format the output clearly with appropriate headings for each section and return(not a JSON)  as {"Summary":summmary text,"Keywords":list of keywords,"Hashtags":list of hashtags,"Titles": list of titles} so i can access by using response.Summary .
"""

# Validate API key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    logger.error("Google API key not set.")
    exit(1)

# Configure Google Gemini Pro with API Key
genai.configure(api_key=GOOGLE_API_KEY)

# Load Whisper model once (cached)
model = whisper.load_model("base")

# Connect to Redis
redis_client = redis.Redis(host='localhost', port=6379, db=0)

def generate_video_id(file):
    """Generate a unique hash for the file content."""
    hash_md5 = hashlib.md5()
    for chunk in iter(lambda: file.read(4096), b""):
        hash_md5.update(chunk)
    file.seek(0)  # Reset file pointer to the beginning
    return hash_md5.hexdigest()

def extract_transcript_details(video_file_path):
    """Extract audio and generate transcript using Whisper."""
    try:
        command = [
            "ffmpeg",
            "-i", video_file_path,
            "-q:a", "0",
            "-f", "wav",
            "-ac", "1",
            "-ar", "16000",
            "pipe:1"
        ]
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        audio_data, _ = process.communicate()
        audio, _ = sf.read(io.BytesIO(audio_data), dtype='float32')
        
        result = model.transcribe(audio)
        return result['text']
    except Exception as e:
        logger.error(f"Error extracting transcript: {e}")
        return None

def generate_gemini_content(transcript_text):
    """Generate SEO suggestions using Google Gemini Pro."""
    try:
        # Add transcript to the prompt
        complete_prompt = prompt_template + "\nTranscript:\n" + transcript_text
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(complete_prompt)

        # Ensure that the response is formatted correctly for JSON output
        return json.loads(response.text)
    except Exception as e:
        logger.error(f"Error generating content: {e}")
        return None

@app.route('/process_video', methods=['POST'])
def process_video():
    """Endpoint to process video and generate SEO suggestions."""
    try:
        if 'video' not in request.files:
            return jsonify({'error': 'No video file uploaded'}), 400

        video = request.files['video']

        # Generate a unique ID for the video
        video_id = generate_video_id(video)

        # Check if the result is already cached in Redis
        cached_response = redis_client.get(video_id)
        if cached_response:
            logger.info("Returning cached response")
            return jsonify(json.loads(cached_response)), 200

        # Save the video temporarily for processing
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
            video.save(temp_file.name)
            temp_video_path = temp_file.name

        logger.info(f"Processing video: {temp_video_path}")

        # Extract transcript from video
        transcript_text = extract_transcript_details(temp_video_path)
        if transcript_text is None:
            return jsonify({'error': 'Failed to extract transcript'}), 500

        logger.info(f"Transcript extracted: {transcript_text[:100]}")

        # Generate SEO suggestions using Gemini Pro
        seo_suggestions = generate_gemini_content(transcript_text)
        if seo_suggestions is None:
            return jsonify({'error': 'Failed to generate SEO suggestions'}), 500

        logger.info(f"SEO suggestions generated: {json.dumps(seo_suggestions)[:100]}")

        # Store the result in Redis with an expiration time (e.g., 24 hours)
        redis_client.setex(video_id, 86400, json.dumps(seo_suggestions))

        return jsonify(seo_suggestions), 200

    except Exception as e:
        logger.error(f"Error processing video: {e}")
        return jsonify({'error': str(e)}), 500

    finally:
        if 'temp_video_path' in locals() and os.path.exists(temp_video_path):
            os.remove(temp_video_path)
            logger.info(f"Temporary file deleted: {temp_video_path}")

if __name__ == '__main__':
    app.run(debug=True)
