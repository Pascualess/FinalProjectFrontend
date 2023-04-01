import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import PlaceContext from '../context/PlaceContext';
import { fetchNearbySearch } from '../services/ApiServices';
import "../css/SelectNearbyPlaces.css"
import { NearbySearch, Result } from "../models/nearbySearch";
import { Itinerary } from "../models/itinerary";
import Footer from './Footer';
import Navbar from './Navbar';


export interface ISelectedNearbyPlacesProps {
  addItinerary: (itinerary: Itinerary) => Promise<Itinerary>;
}

export function SelectNearbyPlaces(props: ISelectedNearbyPlacesProps) {
  const { selectedDestination } = useContext(PlaceContext);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbySearch>();
  const [addedToItinerary, setAddedToItinerary] = useState<{ [key: string]: boolean }>({});

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
    setAddedToItinerary({ ...addedToItinerary, [place.place_id]: true });
    //this code is updating the addedtoItinerary variable. 
    //This is keeping track of the place_id that is being added to the list so the user doesn't add it twice
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
