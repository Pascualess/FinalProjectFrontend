import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import PlaceContext from '../context/PlaceContext';
import { fetchNearbySearch } from '../services/ApiServices';
import { NearbySearch, Result } from "../models/nearbySearch";
import { Itinerary } from "../models/itinerary";
import axios from 'axios';

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
  }, [selectedDestination]);

  const handleAddToItinerary = async (place:Result) => {
    const newItinerary: Itinerary = {
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng
    };
    console.log(newItinerary);

    try {
      await axios.post("/itinerary", newItinerary);
      alert("Added to itinerary!");
      console.log("Added to itinerary");
    } catch (error) {
      alert("Error adding to itinerary.");
    }
  }

  return (
    <div className="selectedNearbyPlaces">
      <h1>Nearby Places</h1>
      {nearbyPlaces && nearbyPlaces.results.map((place) => (
            <div key={place.place_id}>
              {place.photos && place.photos.length > 0 && (
                <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${place.photos[0].photo_reference}&key=AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c`} alt=""
                style={{height: "500px", width: "500px"}} />
              )}
              <h1>{place.name}</h1>
              <h3>{place.rating}</h3>
              <button onClick={() => handleAddToItinerary(place)}>Add to itinerary </button>
            </div>
          ))}
        </div>
  );
}