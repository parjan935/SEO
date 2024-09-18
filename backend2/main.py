import ffmpeg

input_file = 'Test Video 3.mp4'
output_file = 'output_audio.mp3'

ffmpeg.input(input_file).output(output_file, format='mp3').run()
