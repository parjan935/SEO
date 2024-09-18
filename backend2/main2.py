import whisper

model = whisper.load_model("base")
result = model.transcribe("Test Video 3.mp4")
print(result["text"])