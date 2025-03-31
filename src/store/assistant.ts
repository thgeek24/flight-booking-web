import { fetchFlights, type Flight } from "../utils/apis";
import { Store } from "@tanstack/store";

export const showAIAssistant = new Store(false);

export const flightList = new Store<Flight[]>([]);

fetchFlights().then((data) => flightList.setState(() => data));
