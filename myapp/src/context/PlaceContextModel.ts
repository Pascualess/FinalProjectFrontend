import { Result } from "../models/nearbySearch";


export interface PlaceContextModel  {
    places: Result[],
    addPlace: (place:Result) => void,
    removePlace: (place_id: string) => void
}