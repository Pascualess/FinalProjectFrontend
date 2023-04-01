import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Itinerary } from "../models/itinerary";
import { fetchItineraries } from "../services/itineraryOpsService";
import Navbar from "./Navbar";

export interface ItinerariesPageProps {}

export function ItinerariesPage(props: ItinerariesPageProps) {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  
  const navigate = useNavigate()
  useEffect(() => {
    loadItineraries();
  }, []);

  function loadItineraries() {
    fetchItineraries().then(setItineraries);
  }

  function test() {
    console.log(itineraries);
  }

  function handleViewButton(x:Itinerary) {
    navigate(`/itinerary/${x._id}`)
  }
  return (
    <div className="My-Itineraries">
      {/* <Navbar /> */}
      <h1>My Itineraries</h1>
      {itineraries.map((x, index) => (
        <div key={index}>
          <h1 >{x.tripName}</h1>
          <h2 >{x.name}</h2>
          <button onClick={() => handleViewButton(x)}>View Itinerary</button>
        </div>
      ))}
    </div>
 );
}
