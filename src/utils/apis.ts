export type Flight = {
  id: string;
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

export const bookFlightSeat = async (flightId: string) => {
  const response = await fetch("http://localhost:8080/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      flightId: flightId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to book seat");
  }

  return response.json();
};
