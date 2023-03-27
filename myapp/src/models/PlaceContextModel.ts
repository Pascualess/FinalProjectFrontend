import { Result } from "../models/textSearch";

export interface PlaceContextModel {
    selectedDestination: Result
    setDestination: (place:Result) => void
    
}