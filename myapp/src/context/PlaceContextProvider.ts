import { ReactNode, useState } from "react";
import { Result } from "../models/nearbySearch";
import PlaceContext from "./PlaceContext";


export interface IPlaceContextProviderProps {
    children: React.ReactNode
}

const PlaceContextProvider = ({children}: IPlaceContextProviderProps) => {
    const [places, setPlaces] = useState<Result[]>([]);

    const addPlace = (place:Result) => {
        console.log(place);
        setPlaces([...places, place]);
    }

    const removePlace = (place_id: string) => {
        setPlaces(places.filter((x) => x.place_id !== place_id));
    }

   return (
    <PlaceContext.Provider value ={{
        places: places,
        addPlace: addPlace,
        removePlace: removePlace
        }}>{children}</PlaceContext.Proivder>
    );
}; 

export default PlaceContextProvider;