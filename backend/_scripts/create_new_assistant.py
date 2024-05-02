from openai import OpenAI

client = OpenAI()

# Create an assistant
assistant = client.beta.assistants.create(
    model="gpt-4-turbo",
    name="Outreach Reply",  # Name your assistant
    description="Reply to inbound messages"
)

print(assistant)
# print("Assistant ID:", assistant_id)
