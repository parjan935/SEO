import whisper
import subprocess
import numpy as np
import soundfile as sf
import io

def transcribe_video_to_text(video_path):
    # Initialize Whisper model
    model = whisper.load_model("base")
    
    # Extract audio from video using FFmpeg and pipe it
    command = [
        "ffmpeg", "-i", video_path, "-q:a", "0", "-f", "wav", "-ac", "1", "-ar", "16000", "pipe:1"
    ]
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    audio_data, _ = process.communicate()
    
    # Read audio data using SoundFile and convert to numpy array
    audio, samplerate = sf.read(io.BytesIO(audio_data), dtype='float32')
    
    # Transcribe audio
    result = model.transcribe(audio)
    
    return result['text']

# Example usage
video_file = r"C:\Users\suresh\Desktop\Test Video 3.mp4"
transcription = transcribe_video_to_text(video_file)
print(transcription)
