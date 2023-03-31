import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Itinerary } from "../models/itinerary";
import { fetchItinerary } from "../services/itineraryOpsService";

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

  return <div>
    {itinerary?.place.map((x, index) => (
        <div key={index}>
          <h1 >{x.name}</h1>
          {/* <button onClick={() => }>Remove</button> */}
        </div>
      ))}
  </div>;
}
