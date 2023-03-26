import React, { useContext, useState } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import './SearchForm.css';
import { fetchTextSearch } from "../services/ApiServices";
import { TextSearch, Result, Location } from "../models/textSearch";
import PlaceContext from "../context/PlaceContext";
// import  setDestination  from "../context/PlaceProvider";

interface ISearchFormProps {
    setDestination: (place: Location) => void;
}

export function SearchForm() {
    const [results, setResults] = useState<TextSearch>();
    const [title, setTitle] = useState<string>('');
    const [tripDestination, setTripDestination] = useState<string>('');
    const [radius, setRadius] = useState<number>(50000);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedCompany, setSelectedCompany] = useState<string>('solo')
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [selectedPlace, setSelectedPlace] = useState<Result>();

    const { setDestination } = useContext(PlaceContext);

      const onSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Title:', title);
        console.log('Destination:', tripDestination);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Selected Option:', selectedOption);
        const results = await fetchTextSearch(tripDestination, radius)
        setResults(results)  
}

const handlePlaceSelection = (selectedPlace:Location) => {
    props.setDestination(selectedPlace)
};

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
                        <option selected value="solo">Solo</option>
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
                    <button onClick={() => handlePlaceSelection(place.geometry.location)}>{place.name}</button>
                    
                  </div>
                ))}
            <Footer />
        </div>
    )
}
