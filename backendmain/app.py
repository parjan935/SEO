import streamlit as st
from dotenv import load_dotenv
import os
import whisper
import google.generativeai as genai
import subprocess
import io
import soundfile as sf
import tempfile

load_dotenv()  # Load all the environment variables

# Configure Google Gemini Pro with API Key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

prompt = """You are Search Engine Optimizer. You will take the transcript text
and summarize the entire video providing the important Keywords and Hashtags and Short summary and provide better titiles for video. Please provide the summary of the text given here: """

# Initialize Whisper Model
model = whisper.load_model("base")

## Function to extract transcript using Whisper
def extract_transcript_details(video_file_path):
    try:
        # Extract audio from video using FFmpeg and pipe it
        command = [
            "ffmpeg", "-i", video_file_path, "-q:a", "0", "-f", "wav", "-ac", "1", "-ar", "16000", "pipe:1"
        ]
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        audio_data, _ = process.communicate()
        
        # Read audio data and convert to numpy array
        audio, _ = sf.read(io.BytesIO(audio_data), dtype='float32')

        # Transcribe audio using Whisper
        result = model.transcribe(audio)

        return result['text']

    except Exception as e:
        raise e

## Generate summary using Google Gemini Pro
def generate_gemini_content(transcript_text, prompt):
    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt + transcript_text)
        return response.text
    except Exception as e:
        st.error(f"Error generating content: {str(e)}")
        return None

st.title("YouTube Transcript to Detailed Notes Converter")

# Use Streamlit's file uploader for MP4 video input
uploaded_video = st.file_uploader("Upload YouTube Video File (MP4)", type=["mp4"])

if uploaded_video:
    st.video(uploaded_video)  # Display the uploaded video in the Streamlit app

    if st.button("Get Detailed Notes"):
        with st.spinner("Processing video..."):
            # Save the uploaded video temporarily
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
                temp_file.write(uploaded_video.read())
                temp_video_path = temp_file.name

            try:
                # Get the transcript using Whisper
                transcript_text = extract_transcript_details(temp_video_path)

                if transcript_text:
                    # Generate the summary using Gemini Pro
                    st.write(transcript_text)
                    summary = generate_gemini_content(transcript_text, prompt)
                    if summary:
                        st.markdown("## Detailed Notes:")
                        st.write(summary)
                    else:
                        st.error("Failed to generate summary. Please try again.")
                else:
                    st.error("Failed to extract transcript. Please check the video file.")
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")
            finally:
                # Clean up the temporary file
                os.remove(temp_video_path)