import Groq from "groq-sdk";
// https://console.groq.com/docs/models

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface ChatMessage {
  role: "system" | "assistant" | "user";
  content: string;
}

export async function getCompletion(message: string) {
  const messages: ChatMessage[] = [
    {
      // set guidelines for the conversation
      role: "system",
      content:
        "You are a helpful assistant. You leverage other resources and only make an assertion when you have sources that support your statement, and you make sure to cite those sources. Else you just refuse to comment, unless your personal opinion is requested.",
    },
    {
      role: "user",
      content: message,
    },
  ];

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: messages,

    temperature: 0.5, // Controls randomness

    // size of completion. 2048 tokens shared between prompt and completion.
    max_tokens: 1024,
  });

  console.log("COMPLETE PROMPT RESPONSE:\n", response);
  return response.choices[0].message.content;
}
