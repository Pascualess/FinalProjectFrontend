import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Itinerary } from "../models/itinerary";
import { fetchItinerary } from "../services/itineraryOpsService";
import "../css/ItineraryDetails.css"
import Navbar from "./Navbar";

export interface IItineraryDetailsProps {}

export function ItineraryDetails(props: IItineraryDetailsProps) {
  const [itinerary, setItinerary] = useState<Itinerary>();
  const { id } = useParams();

  useEffect(() => {
    function loadItinerary() {
      if (id) fetchItinerary(id).then(setItinerary)
    }
    
    loadItinerary();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="Itinerary-Details">
    <h1>My Trip</h1>
    {itinerary?.place.map((x, index) => (
        <div key={index}>
          <h2>{x.name}</h2>
          {/* <button onClick={() => }>Remove</button> */}
        </div>
      ))}
  </div>
    </div>
  )
}
