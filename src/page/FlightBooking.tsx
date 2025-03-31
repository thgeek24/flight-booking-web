import React, { useState, useEffect } from "react";
import { Search, Plane, MessageCircle, Send } from "lucide-react";
import {
  flightService,
  Flight,
  formatDateTime,
} from "../services/flightService";

const FlightBooking: React.FC = () => {
  const [isAIHelperOpen, setIsAIHelperOpen] = useState(false);
  const [aiPrompt, setAIPrompt] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setIsLoading(true);
        const data = await flightService.getFlights();
        setFlights(data);
      } catch (err) {
        setError("Failed to fetch flights. Please try again later.");
        console.error("Error fetching flights:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleAIHelperToggle = () => {
    setIsAIHelperOpen(!isAIHelperOpen);
  };

  const handleAIPromptSubmit = () => {
    console.log("Submitted AI Prompt:", aiPrompt);
    setAIPrompt("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 flex items-center">
          <Plane className="mr-2" /> Flight Booking
        </h1>

        {/* AI Helper Toggle Button */}
        <button
          onClick={handleAIHelperToggle}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          <MessageCircle />
        </button>
      </div>

      {/* Flight Search */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="From"
            className="flex-1 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="To"
            className="flex-1 p-2 border rounded"
          />
          <input type="date" className="flex-1 p-2 border rounded" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            <Search />
          </button>
        </div>
      </div>

      {/* Flight List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8">Loading flights...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex flex-col items-start">
                <div className="font-bold text-lg">
                  {flight.departure} → {flight.destination}
                </div>
                <div className="text-gray-600">
                  {formatDateTime(flight.departureTime)} -{" "}
                  {formatDateTime(flight.arrivalTime)}
                </div>
                <div className="text-sm text-gray-500">
                  Duration: {flight.duration}
                </div>
                <div className="text-sm text-gray-500">
                  Available Seats: {flight.availableSeats}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">${flight.price}</div>
                <button
                  className={`mt-2 px-4 py-2 rounded text-white ${
                    flight.availableSeats > 0
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={flight.availableSeats === 0}
                >
                  {flight.availableSeats > 0 ? "Book Now" : "Sold Out"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* AI Helper Sidebar */}
      {isAIHelperOpen && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl p-6 z-50 animate-slide-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">AI Flight Assistant</h2>
            <button
              onClick={handleAIHelperToggle}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="flex-grow overflow-y-auto mb-4 h-[calc(100%-150px)]">
            <div className="text-center text-gray-500 mt-10">
              Ask me about finding flights!
            </div>
          </div>

          <div className="flex">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAIPrompt(e.target.value)}
              placeholder="Find me a flight to..."
              className="flex-grow p-2 border rounded-l"
            />
            <button
              onClick={handleAIPromptSubmit}
              className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
            >
              <Send />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
