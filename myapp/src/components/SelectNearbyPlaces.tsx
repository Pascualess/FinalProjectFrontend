import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import PlaceContext from '../context/PlaceContext';
import { fetchNearbySearch } from '../services/ApiServices';
import "../css/SelectNearbyPlaces.css"
import { NearbySearch, Result } from "../models/nearbySearch";
import { Itinerary, Place } from "../models/itinerary";
import Navbar from './Navbar';
import Footer from './Footer';
import { ItinerariesPage } from './ItinerariesPage';
import axios from 'axios';

export interface ISelectedNearbyPlacesProps {
  addItinerary: (itinerary: Itinerary) => Promise<Itinerary>;
}

export function SelectNearbyPlaces(props: ISelectedNearbyPlacesProps) {
  const { selectedDestination } = useContext(PlaceContext);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbySearch>();
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary>();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [addedToItinerary, setAddedToItinerary] = useState<{ [key: string]: boolean }>({});

//this is rendering every time the selectedDestination is updated.
//the async function fetchPlaces makes an API call to get the nearby places from FetchNearbySearch
//results are set to nearbyPlace using setNearbyPlaces
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

  function handleAddToItinerary(newItinerary: Itinerary, selectedPlace: Place) {
    // addItinerary(newItinerary, selectedPlace);
    setItineraries([...itineraries, newItinerary]);
  }

  function handleAddToItineraryOnClick(place: Result) {
    const newPlace = {
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      startDate: "",
      endDate: "",
    };

    const newItinerary: Itinerary = {
      tripTitle: "",
      name: "",
      place: [],
      startDate: "",
      endDate: "",
      lat: 0,
      lng: 0,
    };

    setItineraries([...itineraries, newItinerary]);
    setAddedToItinerary({ ...addedToItinerary, [place.place_id]: true });
    //this code is updating the addedtoItinerary variable. 
    //This is keeping track of the place_id that is being added to the list so the user doesn't add it twice
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
              <p><b>{place.name}</b></p>
              <p>Rating: {place.rating}</p>
              <p>Type: {place.types[0]}</p>
              {!addedToItinerary[place.place_id] ? (
                  <button className="additinerary-button" onClick={() => handleAddToItineraryOnClick(place)}>
                    Add to Itinerary
                  </button>
                ) : (
                  <>
                    <button className="addeditinerary-button">Added to Itinerary</button>
                    <button className="removeitinerary-button" onClick={() => setAddedToItinerary({ ...addedToItinerary, [place.place_id]: false })}>
                      Remove from Itinerary
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* {selectedItinerary && <ItinerariesPage itinerary={selectedItinerary} />} */}
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}
