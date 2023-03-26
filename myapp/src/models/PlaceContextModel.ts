import { Location } from "../models/textSearch";

export interface PlaceContextModel {
    lat:Number,
    lng:Number,
    setDestination: (place:Location) => void
}