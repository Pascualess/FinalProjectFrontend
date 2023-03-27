import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import PlaceContext from '../context/PlaceContext';
import { fetchNearbySearch } from '../services/ApiServices';
import { NearbySearch } from "../models/nearbySearch";

export interface ISelectedNearbyPlacesProps {}

export function SelectNearbyPlaces (props: ISelectedNearbyPlacesProps) {
  const { selectedDestination } = useContext(PlaceContext);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbySearch>();

  useEffect(() => {
    async function fetchPlaces() {
      const places = await fetchNearbySearch(selectedDestination.lat, selectedDestination.lng, 50000);
      setNearbyPlaces(places);
    }
    fetchPlaces();
  }, []);
  function handleAddToItinerary() {

  }

  return (
    <div className="selectedNearbyPlaces">
      {nearbyPlaces && (
        <div>
          {nearbyPlaces.results.map((place) => (
            <div key={place.place_id}>
              <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${place.photos[0].photo_reference}&key=AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c`} alt="" />
              <p>{place.name}</p>
              <p>{place.rating}</p>
              <p>{place.rating}</p>
              <button onClick={() => handleAddToItinerary()}>Add to itinerary </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}