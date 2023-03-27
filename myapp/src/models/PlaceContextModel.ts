import { Location } from "../models/textSearch";

export interface PlaceContextModel {
    selectedDestination: Location
    setDestination: (place:Location) => void
    
}