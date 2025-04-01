import { createServerFn } from "@tanstack/react-start";
import { createXai } from "@ai-sdk/xai";
import { streamText } from "ai";

import getTools from "./ai-tools";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const xai = createXai({
  apiKey:
    "xai-HYyC4MM0RvotaX5avsvGYnj1Qv4ooWJaNcarOCdgGEHV3geeuhuosnSHfDT2h0MC45qA0vMoew0VVSaD",
});

const MODEL = xai("grok-2-latest");

const SYSTEM_PROMPT = `You are an AI for a flight booking website.

There are flights available for booking. 
You can get a list of flights by using the getFlights tool.
You can recommend a flight to the user by using recommendFlight tool.

Before asking the user whether to book a seat, you should firstly tell the user its flight id, departure, desitantion, departure time, arrival time, etc.
You can book a flight seat for the user by using bookSeat tool`;

export const genAIResponse = createServerFn({ method: "POST", response: "raw" })
  .validator(
    (d: {
      messages: Array<Message>;
      systemPrompt?: { value: string; enabled: boolean };
    }) => d
  )
  .handler(async ({ data }) => {
    const messages = data.messages
      .filter(
        (msg) =>
          msg.content.trim() !== "" &&
          !msg.content.startsWith("Sorry, I encountered an error")
      )
      .map((msg) => ({
        role: msg.role,
        content: msg.content.trim(),
      }));

    const tools = await getTools();

    try {
      const result = streamText({
        model: MODEL,
        messages,
        system: SYSTEM_PROMPT,
        maxSteps: 20,
        tools,
      });

      return result.toDataStreamResponse();
    } catch (error) {
      console.error("Error in genAIResponse:", error);
      if (error instanceof Error && error.message.includes("rate limit")) {
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Please try again in a moment.",
          })
        );
      }
      return new Response(
        JSON.stringify({
          error:
            error instanceof Error
              ? error.message
              : "Failed to get AI response",
        })
      );
    }
  });
