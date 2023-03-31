import { Itinerary, Place } from "../models/itinerary";
import axios from "axios";
import { ObjectId } from "mongodb";

const baseUrl = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api";
 
 
//retrieve  all saved itineraries
export function fetchItineraries():Promise<Itinerary[]> {
  return axios.get<Itinerary[]>(`${baseUrl}/itinerary`)
  .then(res => res.data)
}
//add saved itinerary
export function addItinerary(itinerary:Itinerary):Promise<Itinerary> {
  return axios.post<Itinerary>(`${baseUrl}/itinerary`, itinerary).then(res => res.data);
}
//delete a trip
export function deleteTrip(name: string):Promise<Itinerary[]> {
  return axios.delete<Itinerary[]>(`${baseUrl}/itinerary`).then(res => res.data);
  
}
//add place to trip
export function addToItinerary(id: ObjectId, place: Place): Promise<Place[]> {
  return axios.put<Place[]>(`${baseUrl}/itinerary/${id}`, place)
    .then(res => res.data); // Jakes NOTES: This needs to change because i needs the whole itinerary plus the place object to be pushed in the request body. Unless there is a better way to save places in itineraries
}

// Add a new place to a saved itinerary
// export function addPlace(itineraryId: string, place: Place): Promise<Itinerary> {
//   return axios.post<Itinerary>(`${baseUrl}/itinerary/${itineraryId}/place`, place)
//     .then((res) => res.data);
// }

//delete place to a trip
export function deletePlace(itineraryId: string, placeId: string): Promise<Itinerary> {
  return axios
    .delete<Itinerary>(`${baseUrl}/itinerary/${itineraryId}/place/${placeId}`)
    .then((res) => res.data)};

export function fetchItinerary(id: string):Promise<Itinerary> {
  return axios.get<Itinerary>(`${baseUrl}/itinerary/${id}`, {
  })
  .then(res => res.data)}
