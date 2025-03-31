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

export const flightService = {
  getFlights: async (): Promise<Flight[]> => {
    const response = await axios.get(`${API_BASE_URL}/flights`);
    return response.data;
  },
};
