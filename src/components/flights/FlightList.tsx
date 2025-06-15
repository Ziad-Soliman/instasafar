
import React from 'react';
import FlightCard from './FlightCard';

interface Flight {
  id: string;
  airline_name: string;
  airline_name_ar?: string;
  flight_number: string;
  origin: string;
  origin_ar?: string;
  destination: string;
  destination_ar?: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  class: string;
  available_seats: number;
  total_seats: number;
  aircraft_type?: string;
}

interface FlightListProps {
  flights: Flight[];
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
  return (
    <div className="space-y-4">
      {flights.map(flight => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
};

export default FlightList;
