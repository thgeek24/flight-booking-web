import React, { useState, useEffect } from "react";
import { Search, Plane } from "lucide-react";
import {
  flightService,
  Flight,
  formatDateTime,
} from "../services/flightService";
import AIAssistant from "../components/AIAssistant";

const FlightBooking: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingFlightId, setBookingFlightId] = useState<number | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

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

  const handleBookFlight = async (flightId: number) => {
    try {
      setBookingFlightId(flightId);
      setBookingError(null);
      await flightService.bookFlight(flightId);

      // Refresh flights to update available seats
      const updatedFlights = await flightService.getFlights();
      setFlights(updatedFlights);
    } catch (err) {
      setBookingError(
        err instanceof Error ? err.message : "Failed to book flight"
      );
    } finally {
      setBookingFlightId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 flex items-center">
          <Plane className="mr-2" /> Flight Booking
        </h1>

        {/* AI Assistant */}
        <AIAssistant />
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
                  className={`mt-2 px-4 py-2 rounded text-white transition-all duration-200 ${
                    flight.availableSeats > 0
                      ? "bg-green-500 hover:bg-green-600 hover:shadow-md cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={
                    flight.availableSeats === 0 || bookingFlightId === flight.id
                  }
                  onClick={() => handleBookFlight(flight.id)}
                >
                  {bookingFlightId === flight.id
                    ? "Booking..."
                    : flight.availableSeats > 0
                      ? "Book Now"
                      : "Sold Out"}
                </button>
                {bookingError && bookingFlightId === flight.id && (
                  <div className="text-sm text-red-500 mt-2">
                    {bookingError}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FlightBooking;
