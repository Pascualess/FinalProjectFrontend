import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import PlaceContext from '../context/PlaceContext';
import { fetchNearbySearch } from '../services/ApiServices';
import "../css/SelectNearbyPlaces.css"
import { NearbySearch, Result } from "../models/nearbySearch";
import { Itinerary, Place } from "../models/itinerary";
import Navbar from './Navbar';
import Footer from './Footer';
import { addToItinerary } from '../services/itineraryOpsService';


export interface ISelectedNearbyPlacesProps {
  addItinerary: (itinerary: Itinerary) => Promise<Itinerary>;
}

export function SelectNearbyPlaces(props: ISelectedNearbyPlacesProps) {
  const { selectedDestination } = useContext(PlaceContext);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbySearch>();
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary>();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  useEffect(() => {
    async function fetchPlaces() {
      const places = await fetchNearbySearch(
        selectedDestination.geometry.location.lat,
        selectedDestination.geometry.location.lng,
        50000
      );
      setNearbyPlaces(places);
    }
    fetchPlaces();
  }, [selectedDestination]);

  function handleAddToItineraryOnClick(place: Result) { //Jakes Note: This needs to fetch data from the back end to add the place to the itinerary 
    const newPlace = {
      name:place.name,
      id: place.place_id,
      photo_reference: place.photos,
      formatted_address:place.vicinity,
      rating: place.rating,
      types: place.types,
      weekday_text: place.opening_hours,
      _id: undefined,
      lat:place.geometry.location.lat,
      lng:place.geometry.location.lng
    };
    // addToItinerary(selectedDestination.place_id,newPlace) Jakes NOTES: the first param needs to work with the backend to id the itinerary so I can add the new place into the array
  }  

 return (
  <div>
    <Navbar />
    <div className="selectedNearbyPlaces">
      <h1>Nearby Places</h1>
      <div className="places-card">
        {nearbyPlaces?.results?.map((place) => (
          <div className="places-container" key={place.place_id}>
            {place.photos && place.photos.length > 0 && (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${place.photos[0].photo_reference}&key=AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c`}
                alt=""
                className="place-image"
              />
            )}
            <div className="place-details">
              <h2>{place.name}</h2>
              <h2>Rating: {place.rating}</h2>
              <h2>{place.types[0]}</h2>
              <button className="additinerary-button" onClick={() => handleAddToItineraryOnClick(place)}>
                Add to Itinerary{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="Footer">
      <Footer />
    </div>
  </div>
);

}
