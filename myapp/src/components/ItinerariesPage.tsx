import * as React from 'react';
import Navbar from './Navbar';

export interface ItinerariesPageProps {
}

export function ItinerariesPage (props: ItinerariesPageProps) {
  return (
    <div className="My-Itineraries">
      <Navbar />
    </div>
  );
}
