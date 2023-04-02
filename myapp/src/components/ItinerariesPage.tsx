import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Itinerary } from "../models/itinerary";
import { fetchItineraries } from "../services/itineraryOpsService";
import Navbar from "./Navbar";
import "../css/ItinerariesPage.css"

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

  function handleEditButton(itinerary:Itinerary) {
    navigate("/nearby", { state: { isEditing: true, editedItinerary: itinerary } });
  }

  return (
    <div>
      <Navbar />
    <div className="My-Itineraries">
      <h1>My Itineraries</h1>
      <table>
  <thead>
    <tr>
      <th>Trip Name</th>
      <th>Destination</th>
      <th>Itineraries</th>
    </tr>
  </thead>
  <tbody>
      {itineraries.map((x:Itinerary, index) => (
        <tr key={index}>
          <td className="trip-title">{x.tripName}</td>
          <td className="place-name">{x.name}</td>
          <td><button className="additinerary-button" onClick={() => handleViewButton(x)}>View Itinerary</button><button onClick={() => handleEditButton(x)}>Edit</button></td>
        </tr>
      ))}
     </tbody>
      </table>
      </div>
    </div>
 );
}