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
import { useLocation } from 'react-router-dom';



export interface ISelectedNearbyPlacesProps {
  addItinerary: (itinerary: Itinerary) => Promise<Itinerary>;
}

export function SelectNearbyPlaces(props: ISelectedNearbyPlacesProps) {
  const { selectedDestination } = useContext(PlaceContext);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbySearch>();
  const location = useLocation();
  const selectedPlace = location.state.selectedPlace as Result
  const [type, setType] = useState<string>("point_of_interest");

  useEffect(() => {
    async function fetchPlaces() {
      const places = await fetchNearbySearch(
        selectedDestination.geometry.location.lat,
        selectedDestination.geometry.location.lng,
        50000,
        type
      );
      setNearbyPlaces(places);
      console.log( selectedPlace);
    }
    fetchPlaces();
  }, [selectedDestination,selectedPlace, type]);



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
    <Navbar />
    <div className="selectedNearbyPlaces">
      <h1>Nearby Places</h1>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Select Type">Select Type</option>
  <option value="amusement_park">Amusement Park</option>
  <option value="aquarium">Aquarium</option>
  <option value="art_gallery">Art Gallery</option>
  <option value="bowling_alley">Bowling Alley</option>
  <option value="cafe">Cafe</option>
  <option value="campground">Campground</option>
  <option value="casino">Casino</option>
  <option value="movie_theater">Movie Theater</option>
  <option value="museum">Museum</option>
  <option value="night_club">Night Club</option>
  <option value="park">Park</option>
  <option value="rv_park">RV Park</option>
  <option value="tourist_attraction">Tourist Attraction</option>
  <option value="zoo">Zoo</option>
      </select>
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
