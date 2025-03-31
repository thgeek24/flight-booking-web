import { createXai } from "@ai-sdk/xai";
import { streamText } from "ai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
});

const model = xai("grok-2-latest");

export const answerMyQuestion = async (prompt: string) => {
  const { textStream } = await streamText({
    model,
    prompt,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }

  return textStream;
};

const answer = await answerMyQuestion("What is the color of the Sun?");

console.log(answer);
