import { useState } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import './SearchForm.css';
// interface ISearchFormProps {
//     EventList: Function;
// }
export function SearchForm() {
    //const [events] = useState<AnEvent[]>([])
    const [title, setTitle] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');

    // const onSubmit = (event:any) => {
    //     event.preventDefault();
    //     console.log(startDate, endDate);
    //     //GetAllEvents(keyword, postalCode, startDateTime, endDateTime).then((events) => {
    //         //lifting up state
    //         // props.EventList(events)
    //         // console.log(events);
    //     }
    // }

    return (
        <div className="SearchForm">
            <Navbar />
            <Hero />
            <form className="form-container">
                 <label>
                     Trip Title:    
                 <input type="text" name="title" placeholder="Give your trip a name." value={title}
                onChange={(e) => setTitle(e.target.value)} />
                </label>
                
                
                    <label>
                     Destination:
                 <input type="text" name="destination"  placeholder="What is your destination?" value={destination}
                onChange={(e) => setDestination(e.target.value.replace(/[^a-z]/gi, ''))} />
                </label>
                  
                <label>
                     Start Date/End Date:
                 <input type="date" name="startDate" value={startDate}
                onChange={(e) => setStartDate(e.target.value)} />
                 <input type="date" name="endDate" value={endDate}
                onChange={(e) => setEndDate(e.target.value)} />
                </label>
                  
                    <button className="submit" type="submit" value="Submit">Search</button>
            </form>
            <Footer />
        </div>
    )
}