import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Itinerary } from "../models/itinerary";
import { deletePlace, fetchItinerary } from "../services/itineraryOpsService";
import Navbar from "./Navbar";

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

  function handleRemoveButton(x: string) {
    if (itinerary?._id) {
      deletePlace(itinerary._id, x).then(() => {
        setDeleted(!deleted);
      });
    }
  }
  return (
    <div>
      <Navbar />
      <div className="ItineraryDetails"></div>
      {itinerary?.place.map((x, index) => (
        <div key={index}>
          <h1>{x.name}</h1>
          <button onClick={() => handleRemoveButton(x.id)}>Remove</button>
          <button>Details</button>
        </div>
      ))}
    </div>
  );
}
