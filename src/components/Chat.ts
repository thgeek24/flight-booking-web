import { createXai } from "@ai-sdk/xai";
import { generateText } from "ai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
});

const model = xai("grok-2-latest");

export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
};

const answer = await answerMyQuestion("What is the color of Sun?");

console.log(answer);
