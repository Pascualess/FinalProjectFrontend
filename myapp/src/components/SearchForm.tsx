import { useState } from "react";
import { Result } from "../models/nearbySearch";
import { getNearbySearch } from "../services/nearbySearchService";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import './SearchForm.css';

interface ISearchFormProps {
    PlaceList: Function;
}

export function SearchForm(props: ISearchFormProps) {
    const [places] = useState<Result[]>([]);
    const [title, setTitle] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('');

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     console.log('Title:', title);
    //     console.log('Destination:', destination);
    //     console.log('Start Date:', startDate);
    //     console.log('End Date:', endDate);
    //     console.log('Selected Option:', selectedOption);
    //   }

      const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Title:', title);
        console.log('Destination:', destination);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Selected Option:', selectedOption);;
        getNearbySearch((lat, lng, radius) => {
            //lifting up state
            props.PlaceList(lat, lng, radius)
            console.log(lat, lng, radius);
        })
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
                    <input type="text" id="destination"  placeholder="Enter a city and/or state." value={destination}
                    onChange={(e) => setDestination(e.target.value.replace(/[^a-z]/gi, ''))} />
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
                    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option selected value="solo">Solo</option>
                        <option value="family">Family</option>
                        <option value="couples">Couples</option>
                        <option value="friends">Friends</option>
                    </select>
                </label>    
            <button className="submit" type="submit" value="submit">Search</button>   
                </form>  
            </div>

            {places.map((place:any) => (
                    /* @ts-ignore */
                    <div key = {place.place_id}>
                        {place.name}
                    </div>
                ))}
            <Footer />
        </div>
    )
}