import * as React from "react";
import { useContext, useEffect, useState } from "react";
import PlaceContext from "../context/PlaceContext";
import { fetchNearbySearch } from "../services/ApiServices";
import "../css/SelectNearbyPlaces.css";
import { NearbySearch, Result } from "../models/nearbySearch";
import { Itinerary, Place } from "../models/itinerary";
import Navbar from './Navbar';
import Footer from './Footer';
import { addToItinerary } from '../services/itineraryOpsService';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export interface ISelectedNearbyPlacesProps {
  addItinerary: (itinerary: Itinerary) => Promise<Itinerary>;
}

export function SelectNearbyPlaces(props: ISelectedNearbyPlacesProps) {
  const { selectedDestination } = useContext(PlaceContext);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbySearch>();
  const location = useLocation();
  const selectedPlace = location.state.selectedPlace as Result;
  const selectedTitle = location.state.selectedTitle
  const isEditing = location.state?.isEditing;
  const editedItinerary: Itinerary = location.state?.editedItinerary;
  const [type, setType] = useState<string>("point_of_interest");
  const [addedToItinerary, setAddedToItinerary] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    async function fetchPlacesForEdit() {
      const edit = await fetchNearbySearch(
        editedItinerary.lat,
        editedItinerary.lng,
        50000,
        type
      );
      setNearbyPlaces(edit);
    }

    async function fetchPlaces() {
      const places = await fetchNearbySearch(
        selectedDestination.geometry.location.lat,
        selectedDestination.geometry.location.lng,
        50000,
        type
      );
      setNearbyPlaces(places);
    }
    if (isEditing) {
      fetchPlacesForEdit();
    } else {
      fetchPlaces();
    }
  }, [selectedDestination, selectedPlace, type, isEditing, editedItinerary]);

  function handleAddToItineraryOnClick(place: Result) {
    //Jakes Note: This needs to fetch data from the back end to add the place to the itinerary
    const newPlace: Place = {
      name: place.name,
      id: place.place_id,
      photo_reference: place.photos[0].photo_reference,
      formatted_address: place.vicinity,
      rating: place.rating,
      types: place.types,
      _id: undefined,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    };
    if (isEditing) {
      addToItinerary(editedItinerary.place_id, editedItinerary.tripName, newPlace);
      setAddedToItinerary({ ...addedToItinerary, [place.place_id]: true });
    } else {
      addToItinerary(selectedPlace.place_id, selectedTitle, newPlace);
      setAddedToItinerary({ ...addedToItinerary, [place.place_id]: true });
    //this code is updating the addedtoItinerary variable. 
    //This is keeping track of the place_id that is being added to the list so the user doesn't add it twice
    }
  }

  return (
    <div>
      <Navbar />
      <div className="selectNearbyPlaces">
        <h1>Nearby Places</h1>
        <select className="types" value={type} onChange={(e) => setType(e.target.value)}>
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
        <Row className="NearbyPlacesRow">
          {nearbyPlaces?.results?.map((place, index) => (
            <Col className="places-column"key={index}>
              <Card className="mb-3 card-column">
                {place.photos && place.photos.length > 0 && (
                  <CardImg top src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${place.photos[0].photo_reference}&key=AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c`} 
                  alt="Place" />
                )}
                <CardBody>
                  <CardTitle tag="h3">{place.name}</CardTitle>
                  <CardSubtitle tag="h4" className="mb-2 text-muted">{place.types[0].replace(/_/g, " ")}</CardSubtitle>
                  <CardSubtitle tag="h4" className="mb-2">{`Rating: ${place.rating}`}</CardSubtitle>
                  {!addedToItinerary[place.place_id] ? (
                    <button className="additinerary-button" onClick={() => handleAddToItineraryOnClick(place)}>
                      Add to Itinerary
                    </button>
                  ) : (
                    <>
                    <button className="addeditinerary-button">
                      Added to Itinerary
                    </button>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}
