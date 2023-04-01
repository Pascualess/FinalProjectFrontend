import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Itinerary } from "../models/itinerary";

import { fetchItinerary } from "../services/itineraryOpsService";
import "../css/ItineraryDetails.css"
import Navbar from "./Navbar";

import { deletePlace, fetchItinerary } from "../services/itineraryOpsService";


export interface IItineraryDetailsProps {}

export function ItineraryDetails(props: IItineraryDetailsProps) {
  const [itinerary, setItinerary] = useState<Itinerary>();
  const [deleted, setDeleted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    function loadItinerary() {
      if (id) fetchItinerary(id).then(setItinerary);
    }

    loadItinerary();
  }, [id, deleted]);

  return (
    <div>
      <Navbar />
      <div className="Itinerary-Details">
    <h1>My Trip</h1>
    {itinerary?.place.map((x, index) => (
        <div key={index}>
          <h2>{x.name}</h2>
          <button onClick={() => handleRemoveButton(x.id)}>Remove</button>
          <button>Details</button>
        </div>
      ))}
  </div>
    </div>
  )

}
