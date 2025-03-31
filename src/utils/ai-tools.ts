import { tool } from "ai";
import { z } from "zod";
import { fetchFlights } from "./apis";

const getFlights = tool({
  description: "Get all flights from the database",
  parameters: z.object({}),
  execute: async () => await fetchFlights(),
});

const recommendFlight = tool({
  description: "Use this tool to recommend a flight to the user",
  parameters: z.object({
    id: z.string().describe("The id of the flight to recommend"),
  }),
});

export default async function getTools() {
  return {
    getFlights,
    recommendFlight,
  };
}
