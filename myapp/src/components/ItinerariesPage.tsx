import * as React from 'react';
import Navbar from './Navbar';
import { Itinerary } from "../models/itinerary";

export interface ItinerariesPageProps {
}

export const itineraryState = {
  itineraries: [] as Itinerary[],
  setItineraries: (itineraries: Itinerary[]) => {}
};
export function ItinerariesPage (props: ItinerariesPageProps) {
  const {itineraries} = itineraryState;
  
  
  return (
    <div className="My-Itineraries">
      <Navbar />
      <h1>My Itineraries</h1>
      <ul>
        {itineraries.map(itinerary => (
          <li>
            <h2>{itinerary.tripTitle}</h2>
            <p>{itinerary.startDate} - {itinerary.endDate}</p>
            <p>{itinerary.name}</p>
            <p>Latitude: {itinerary.lat}, Longitude: {itinerary.lng}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}