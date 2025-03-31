import axios from "axios";

export type Flight = {
  id: number;
  departure: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
};

const API_BASE_URL = "http://localhost:8080";

export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const calculateDuration = (
  departureTime: string,
  arrivalTime: string
): string => {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);

  const diffInMinutes = Math.round(
    (arrival.getTime() - departure.getTime()) / (1000 * 60)
  );
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  return `${hours} hr ${minutes} min`;
};

export const flightService = {
  getFlights: async (): Promise<Flight[]> => {
    const response = await axios.get(`${API_BASE_URL}/flights`);
    return response.data.map((flight: Omit<Flight, "duration">) => ({
      ...flight,
      duration: calculateDuration(flight.departureTime, flight.arrivalTime),
    }));
  },
};
