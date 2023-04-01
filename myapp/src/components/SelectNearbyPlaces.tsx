import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import PlaceContext from '../context/PlaceContext';
import { fetchNearbySearch } from '../services/ApiServices';
import "../css/SelectNearbyPlaces.css"
import { NearbySearch, Result } from "../models/nearbySearch";
import { Itinerary, Place } from "../models/itinerary";
import Footer from './Footer';

import Navbar from './Navbar';
import { addToItinerary } from '../services/itineraryOpsService';
import { useLocation } from 'react-router-dom';

export interface ISelectedNearbyPlacesProps {
  addItinerary: (itinerary: Itinerary) => Promise<Itinerary>;
}

export function SelectNearbyPlaces(props: ISelectedNearbyPlacesProps) {
  const { selectedDestination } = useContext(PlaceContext);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbySearch>();
  const [addedToItinerary, setAddedToItinerary] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();
  const selectedPlace = location.state.selectedPlace as Result


  useEffect(() => {
    async function fetchPlaces() {
      const places = await fetchNearbySearch(
        selectedDestination.geometry.location.lat,
        selectedDestination.geometry.location.lng,
        50000
      );
      setNearbyPlaces(places);
      console.log( selectedPlace);
    }
    fetchPlaces();
  }, [selectedDestination,selectedPlace]);

  function handleAddToItineraryOnClick(place: Result) { //Jakes Note: This needs to fetch data from the back end to add the place to the itinerary 
    const newPlace:Place = {
      name:place.name,
      id: place.place_id,
      photo_reference: place.photos[0].photo_reference,
      formatted_address:place.vicinity,
      rating: place.rating,
      types: place.types,
      _id: undefined,
      lat:place.geometry.location.lat,
      lng:place.geometry.location.lng
    };

    addToItinerary(selectedPlace.place_id,newPlace) 

  }  

 return (
  <div>
    <div>
      <Navbar />
    </div>
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
              <h4>{place.name}</h4>
              <h4>Rating: {place.rating}</h4>
              <h4>{place.types[0]}</h4>
              {!addedToItinerary[place.place_id] ? (
                  <button className="additinerary-button" onClick={() => handleAddToItineraryOnClick(place)}>
                    Add to Itinerary
                  </button>
                ) : (
                  <>
                    <button className="addeditinerary-button">Added to Itinerary</button>
                  </>
                )}
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
