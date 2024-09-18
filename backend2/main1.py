import torch
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
import soundfile as sf
import numpy as np
import librosa

device = "cuda:0" if torch.cuda.is_available() else "cpu"
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

model_id = "distil-whisper/distil-large-v3"

# Load model
print("Loading model...")
model = AutoModelForSpeechSeq2Seq.from_pretrained(
    model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True, use_safetensors=True
)
model.to(device)
print("Model loaded.")

processor = AutoProcessor.from_pretrained(model_id)

pipe = pipeline(
    "automatic-speech-recognition",
    model=model,
    tokenizer=processor.tokenizer,
    feature_extractor=processor.feature_extractor,
    max_new_tokens=128,
    torch_dtype=torch_dtype,
    device=device,
)

# Function to convert stereo/multi-channel audio to mono and resample to 16,000 Hz
def convert_to_mono_and_resample(input_audio_path, output_audio_path, target_sample_rate=16000):
    # Load the stereo audio file
    print(f"Loading audio from: {input_audio_path}")
    audio, sample_rate = sf.read(input_audio_path)

    # Check if the audio file is already mono
    if len(audio.shape) == 2:  # If audio has more than 1 channel
        # Convert to mono by averaging the channels
        print("Converting stereo to mono...")
        audio_mono = np.mean(audio, axis=1)
    else:
        print("Audio is already mono.")
        audio_mono = audio

    # Resample the audio to 16,000 Hz if necessary
    if sample_rate != target_sample_rate:
        print(f"Resampling audio from {sample_rate} Hz to {target_sample_rate} Hz...")
        audio_mono = librosa.resample(audio_mono, orig_sr=sample_rate, target_sr=target_sample_rate)

    # Save the mono audio file
    sf.write(output_audio_path, audio_mono, target_sample_rate)
    print(f"Mono and resampled audio saved to: {output_audio_path}")
    return output_audio_path, target_sample_rate

# Paths to input and output audio files
input_audio_path = "output_audio.wav"
output_audio_path = "output_audio_file_mono_resampled.wav"

# Convert the input audio to mono and resample to 16,000 Hz if necessary
converted_audio_path, target_sample_rate = convert_to_mono_and_resample(input_audio_path, output_audio_path)

# Load the converted (mono and resampled) audio file
audio, sample_rate = sf.read(converted_audio_path)

# Preprocess the audio to get the input features and attention mask
inputs = processor(audio, return_tensors="pt", sampling_rate=sample_rate)
input_features = inputs.input_features.to(device)
attention_mask = inputs.attention_mask.to(device)

# Pass the audio data to the pipeline with attention mask
print("Processing audio for speech recognition...")
result = pipe(input_features=input_features, attention_mask=attention_mask)

# Check if the result has the expected transcription text
if "text" in result:
    print("Transcription:", result["text"])
else:
    print("No transcription found in the result.")

# Debugging: print the full result if needed
print("Full result:", result)
 