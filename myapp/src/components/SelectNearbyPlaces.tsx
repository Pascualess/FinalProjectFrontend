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

    // const newItinerary: Itinerary = {
    //   tripTitle: "",
    //   name: "",
    //   place: [],
    //   startDate: "",
    //   endDate: "",
    // };

    // props.addItinerary(newItinerary).then((itinerary) => {
    //   setSelectedItinerary(itinerary);
    //   handleAddToItinerary(newItinerary);
    // });
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
                  style={{ height: "500px", width: "500px" }}
                />
              )}
              <h2>{place.name}</h2>
              <h2>Rating: {place.rating}</h2>
              <h2>{place.types[0]}</h2>
              <button className="additinerary-button" onClick={() => handleAddToItineraryOnClick(place)}>
                Add to Itinerary{" "}
              </button>
            </div>
          ))}
        </div>
        {/* {selectedItinerary && <ItinerariesPage itinerary={selectedItinerary} />} */}
      </div>
      <Footer />
    </div>
  );
}
