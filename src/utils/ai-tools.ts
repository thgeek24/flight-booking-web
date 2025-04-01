import { tool } from "ai";
import { z } from "zod";
import { bookFlightSeat, fetchFlights } from "./apis";

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

const bookSeat = tool({
  description: "Use this tool to book a flight seat for the user",
  parameters: z.object({
    flightId: z.string().describe("The id of the flight to book"),
  }),
  execute: async ({ flightId }) => await bookFlightSeat(flightId),
});

export default async function getTools() {
  return {
    getFlights,
    recommendFlight,
    bookSeat,
  };
}
