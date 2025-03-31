export type Flight = {
  id: number;
  departure: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
};

export const fetchFlights = async () => {
  const response = await fetch("http://localhost:8080/flights");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as unknown as Flight[];
};
