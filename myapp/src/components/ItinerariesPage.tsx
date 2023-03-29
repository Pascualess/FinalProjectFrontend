import * as React from 'react';
import Navbar from './Navbar';
import { Itinerary } from "../models/itinerary";
import Footer from './Footer';
import { useState } from 'react';

export interface IItinerariesPageProps {
  itinerary: Itinerary;
}

export function ItinerariesPage(props: IItinerariesPageProps) {
  return (
    <div className="itinerary">
      <h2>Itinerary</h2>
      <ul>
        {/* {props.itinerary.place.map((place, index) => (
          <li key={index}>{place.name}</li>
        ))} */}
      </ul>
    </div>
  );
}