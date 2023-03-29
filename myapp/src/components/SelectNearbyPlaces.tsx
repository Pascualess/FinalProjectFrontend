import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import PlaceContext from '../context/PlaceContext';
import { fetchNearbySearch } from '../services/ApiServices';
import "../css/SelectNearbyPlaces.css"
import { NearbySearch, Result } from "../models/nearbySearch";
import { Itinerary } from "../models/itinerary";
import Navbar from './Navbar';
import Footer from './Footer';
import { ItinerariesPage } from './ItinerariesPage';
import axios from 'axios';


export interface ISelectedNearbyPlacesProps {
  addItinerary: (itinerary: Itinerary) => Promise<Itinerary>;
}

export function SelectNearbyPlaces (props: ISelectedNearbyPlacesProps) {
  const { selectedDestination } = useContext(PlaceContext);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbySearch>();
  // const [selectedItinerary, setSelectedItinerary] = useState<Itinerary>({
  //   tripTitle: "",
  //   name: "",
  //   place: [],
  //   startDate: "",
  //   endDate: "",
  // });
  
  useEffect(() => {
    async function fetchPlaces() {
      const places = await fetchNearbySearch(selectedDestination.geometry.location.lat, selectedDestination.geometry.location.lng, 50000);
      setNearbyPlaces(places);
    }
    fetchPlaces();
  }, [selectedDestination]);
  
  const handleAddToItinerary = (place: Result) => {
    const newPlace = {
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      startDate: "",
      endDate: "",
    };

  //   // const newItinerary: Itinerary = {
  //   //   tripTitle: "",
  //   //   name: "",
  //   //   place: [],
  //   //   startDate: "",
  //   //   endDate: "",
  //   // };
    
  //   props.addItinerary(newItinerary)
  //     .then((itinerary) => {
  //       setSelectedItinerary(itinerary);
  //     });
  };

  return (
    <div className="selectedNearbyPlaces">
      <Navbar /> 
      <div>
        <h1>Nearby Places</h1>
        <div className="">
          {nearbyPlaces?.results?.map((place) => (
            <div key={place.place_id}>
              {place.photos && place.photos.length > 0 && (
                <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${place.photos[0].photo_reference}&key=YOUR_API_KEY`} alt=""
                style={{height: "500px", width: "500px"}} />
              )}
              <h1>{place.name}</h1>
              <h3>{place.rating}</h3>

              <button onClick={() => handleAddToItinerary(place)}>Add to itinerary </button> 
            </div>
          ))}

        </div>
        {/* {selectedItinerary && <ItinerariesPage itinerary={selectedItinerary} />} */}
    </div>
     <Footer />
    </div>
  );
}