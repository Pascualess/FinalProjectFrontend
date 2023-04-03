import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Itinerary } from "../models/itinerary";
import { deleteItinerary, fetchItineraries } from "../services/itineraryOpsService";
import Navbar from "./Navbar";
import "../css/ItinerariesPage.css"
import { ObjectId } from "mongodb";

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

  async function handleDeleteButton(id: ObjectId | undefined) {
    if (!id) {
      console.log("Invalid itinerary ID");
      return;
    }
  
    const result = await deleteItinerary(id);
    if (result && result.message === "Itinerary deleted successfully") {
      loadItineraries();
    } else {
      console.log("Failed to delete itinerary");
    }
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
      {itineraries.map((x, index) => (
        <tr key={index}>
          <td className="trip-title">{x.tripName}</td>
          <td className="place-name">{x.name}</td>
          <td><button className="additinerary-button" onClick={() => handleViewButton(x)}>View Itinerary</button></td>
          {x._id && (
        <td><button className="delete-button" onClick={() => handleDeleteButton(x._id)}>Delete</button></td>
      )}

        </tr>
      ))}
     </tbody>
      </table>
      </div>
    </div>
 );
}