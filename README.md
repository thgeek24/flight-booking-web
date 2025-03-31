# Flight Booking Demo

A modern React application for booking flights with a clean, user-friendly interface and AI-powered assistance.

## Features

- Real-time flight search and display
- Clean and intuitive user interface
- AI-powered flight assistant
- Responsive design
- Date and time formatting
- Automatic flight duration calculation

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Axios for API calls
- Lucide React for icons

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on localhost:8080

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd flight-booking-demo
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Integration

The application expects a backend API running on `http://localhost:8080` with the following endpoint:

### GET /flights

Returns an array of flight objects with the following structure:

```typescript
{
  id: number;
  departure: string;
  destination: string;
  departureTime: string; // ISO 8601 format (e.g., "2025-03-30T09:00:00Z")
  arrivalTime: string; // ISO 8601 format
  price: number;
}
```

## Features in Detail

### Flight Display

- Shows departure and destination cities
- Displays formatted departure and arrival times
- Automatically calculates and shows flight duration
- Shows flight price with booking option

### AI Assistant

- Toggleable AI helper sidebar
- Natural language interface for flight queries
- Real-time assistance for flight booking

### Date/Time Formatting

- Converts ISO timestamps to user-friendly format
- Displays dates in "MMM DD · HH:MM AM/PM" format
- Calculates and displays duration in "X hr Y min" format

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
