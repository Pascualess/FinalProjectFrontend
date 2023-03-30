import * as React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useState } from 'react';
import { Itinerary } from "../models/itinerary";

export interface ItinerariesPageProps {
  itinerary: Itinerary[];
}

export function ItinerariesPage(props: ItinerariesPageProps) {
  return (
    <div className="My-Itineraries">
      <Navbar />
      <h1>My Itineraries</h1>
      <ul>
        {props.itinerary.map(itinerary => (
          <li key={itinerary.tripTitle}>
            <h2>{itinerary.tripTitle}</h2>
            <p>{itinerary.startDate} - {itinerary.endDate}</p>
            <p>{itinerary.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}