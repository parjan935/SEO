import json

data_string = '''{
    "summary": "```javascript\\n{\\n \\\"Summary\\\": \\\"The video discusses the job application process of a candidate who struggled initially due to a varied resume but eventually received a call from a recruiter through Nockery after applying on LinkedIn and highlighting their data science experience despite having a background in teaching and other fields.\\\",\\n \\\"Keywords\\\": [\\n \\\"Job Application\\\",\\n \\\"LinkedIn\\\",\\n \\\"Data Science\\\",\\n \\\"Resume Optimization\\\",\\n \\\"Nockery\\\"\\n ],\\n \\\"Hashtags\\\": [\\n \\\"#JobSearchJourney\\\",\\n \\\"#LinkedIn\\\",\\n \\\"#DataScienceCareer\\\",\\n \\\"#ResumeTips\\\",\\n \\\"#Nockery\\\"\\n ],\\n \\\"Titles\\\": [\\n \\\"Job Application Optimization: From Varied Resume to Successful Call\\\",\\n \\\"Leveraging LinkedIn for Data Science Job Search: A Journey of Persistence\\\"\\n ]\\n}\\n```"
}'''

# Step 1: Parse the outer JSON
data = json.loads(data_string)

# Step 2: Extract the summary string and clean it up
summary_text = data['summary'].strip('```javascript\n').strip()

# Step 3: Parse the inner JSON
formatted_data = json.loads(summary_text)

# Step 4: Display the formatted output
print("Summary:")
print(formatted_data['Summary'])

print("\nKeywords:")
for keyword in formatted_data['Keywords']:
    print(f"- {keyword}")

print("\nHashtags:")
for hashtag in formatted_data['Hashtags']:
    print(f"- {hashtag}")

print("\nTitles:")
for title in formatted_data['Titles']:
    print(f"- {title}")
