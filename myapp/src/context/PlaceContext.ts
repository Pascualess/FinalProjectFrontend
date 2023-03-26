import { createContext } from "react";
import { PlaceContextModel } from "./PlaceContextModel";


const defaultValue:PlaceContextModel = {
    places: [],
    addPlace: () => {},
    removePlace: () => {}
}

const PlaceContext = createContext(defaultValue)

export default PlaceContext;