import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Itinerary } from "../models/itinerary";
import { deletePlace, fetchItinerary } from "../services/itineraryOpsService";
import Navbar from "./Navbar";
import "../css/ItineraryDetails.css"

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
      <div className="ItineraryDetails">
        <h1>{itinerary?.tripName}</h1>
        <h2>Start Date: {itinerary?.startDate}</h2>
        <h2>End Date: {itinerary?.endDate}</h2>
      </div>
      <div className="places-list">
        {itinerary?.place.map((x, index) => (
          <div key={index} className="place-item">
            {x.photo_reference && (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${x.photo_reference}&key=AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c`}
                alt=""
                className="place-image"
              />
            )}
            <h2>{x.name}</h2>
            <div className="buttons">
            <Link to={`/details/${x.id}`}>
                <button className="details-button">Details</button>
            </Link>
              <button className="remove-button" onClick={() => handleRemoveButton(x.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}
