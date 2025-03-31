import React from "react";
import { useStore } from "@tanstack/react-store";

import { flightList, showAIAssistant } from "../store/assistant";

export default function FlightRecommendation({ id }: { id: string }) {
  const flights = useStore(flightList);

  const flight = flights.find((flight) => flight.id === id);
  if (!flight) {
    return null;
  }
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-orange-500/20 bg-gray-800/50">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {flight.departure}
        </h3>
        <p className="text-sm text-gray-300 mb-3 line-clamp-2">
          {flight.destination}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-emerald-400">
            ${flight.price}
          </div>
        </div>
      </div>
    </div>
  );
}
