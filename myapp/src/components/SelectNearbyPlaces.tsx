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
import { Col, Container, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';


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
    addToItinerary(selectedPlace.place_id,newPlace);
    setAddedToItinerary({ ...addedToItinerary, [place.place_id]: true });
    //this code is updating the addedtoItinerary variable. 
    //This is keeping track of the place_id that is being added to the list so the user doesn't add it twice
     
  }  

  return (
    <div>
      <Navbar />
      <Container fluid className="selectedNearbyPlaces">
        <h1>Nearby Places</h1>
        <Row>
          {nearbyPlaces?.results?.map((place, index) => (
            <Col xs="12" sm="6" md="4" lg="3" key={index}>
              <Card className="mb-3 card-column">
                {place.photos && place.photos.length > 0 && (
                  <CardImg top src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${place.photos[0].photo_reference}&key=AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c`} 
                  alt="Place" />
                )}
                <CardBody>
                  <CardTitle tag="h2">{place.name}</CardTitle>
                  <CardSubtitle tag="h3" className="mb-2 text-muted">{place.types[0]}</CardSubtitle>
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
      </Container>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}
