import React, { useContext, useState } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import { fetchTextSearch } from "../services/ApiServices";
import { TextSearch, Result} from "../models/textSearch";
import PlaceContext from "../context/PlaceContext";
import { useNavigate } from "react-router-dom";
import { Itinerary } from "../models/itinerary";
import { addItinerary } from "../services/itineraryOpsService";
import '../css/SearchForm.css'

interface ISearchFormProps {
}

//created a bunch of state variables to store the users input from the search form
export function SearchForm() {
    const [results, setResults] = useState<TextSearch>();
    const [title, setTitle] = useState<string>('');
    const [tripDestination, setTripDestination] = useState<string>('');
    const [radius, setRadius] = useState<number>(50000);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedCompany, setSelectedCompany] = useState<string>('solo')

    //the useContext hook is accessing the setDestination function from PlaceContext
    const { setDestination } = useContext(PlaceContext);
    const navigate = useNavigate();

    //onSubmit will be called when the user submits the search form
    //it calls the fetchTextSearch function from ApiServices, which will take in the 
    //destination input and grabs the location and radius and returns results
      const onSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const results = await fetchTextSearch(tripDestination, radius)
        setResults(results)  
}

//handles when user clicks on place in search results
//sets the selected destination using setDestination function from PlaceContext
//this will create a new itinerary object with selected place's details from user's input
const handlePlaceSelection = (selectedPlace:Result,startDate:string,endDate:string,title:string) => {
    setDestination(selectedPlace)

    const newItinerary: Itinerary = {
        tripName: title,
        name: selectedPlace.name,
        photo_reference: selectedPlace.photos[0].photo_reference,
        lat: selectedPlace.geometry.location.lat,
        lng: selectedPlace.geometry.location.lng,
        _id: undefined,
        place: [],
        startDate: startDate,
        endDate: endDate,
        
      };

      //this calls the addItinerary function from ItineraryOpsService with the new itinerary object
      addItinerary(newItinerary);
    
      //once place is selected, it will navigate the user to the Nearby page (SelectNearbyPlaces component)
    navigate('/nearby', { state: {place: selectedPlace } }); // Jakes NOTE: this state and place are probably not needed.<<<<<<<<<O
}

    return (
        <div className="SearchForm">
            <Navbar />
            <Hero />
            <div className="form-container">
                <form onSubmit={onSubmit}>
                 <label>
                     Trip Title:    
                    <input type="text" name="title" placeholder="Give your trip a name." value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                </label>
                
                <label>
                     Destination:
                    <input type="text" id="tripDestination"  placeholder="Enter a city and/or state." value={tripDestination}
                    onChange={(e) => setTripDestination(e.target.value.replace(/[^a-z]/gi, ''))} />
                </label>

                <label>
                     Radius:
                    <input type="number" name="radius" value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))} />
                </label>
                  
                <label>
                     Start Date:
                    <input type="date" name="startDate" value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} />
                </label>

                <label>
                    End Date:
                    <input type="date" name="endDate" value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} />
                </label>
                
                <label>Who is going? (This will tailor the activities):
                    <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                        <option value="solo">Solo</option>
                        <option value="family">Family</option>
                        <option value="couples">Couples</option>
                        <option value="friends">Friends</option>
                    </select>
                </label>    
            <button className="submit" type="submit" value="submit">Search</button>   
                </form>  
            </div>

            {results?.results.map((place) => (
                    <div key={place.place_id}>
                    <p>{place.formatted_address}</p>
                    {/* added this for extra detail on places, 
              so we don't think it's showing the same place twice, but rather different locations with same name */}
                    <div>
                      <button className="handle-button" onClick={() => handlePlaceSelection(place, startDate, endDate, title)}>{place.name}</button>  
                        </div>
                    
                  </div>
                ))}
            <div className="Footer">
                <Footer />
            </div>
        </div>
    )
}
