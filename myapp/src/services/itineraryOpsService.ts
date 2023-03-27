import { Itinerary } from "../models/itinerary";
import axios from "axios";

const baseUrl = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api/";
 
 
//retrieve  all saved itineraries
export function fetchitinerary():Promise<Itinerary[]> {
  return axios.get<Itinerary[]>(`${baseUrl}/itinerary`)
  .then(res => res.data)
}
//add saved itinerary
export function additinerary(itinerary:Itinerary):Promise<Itinerary> {
  return axios.post<Itinerary>(`${baseUrl}/itinerary`, itinerary).then(res => res.data);
}
//delete a trip
export function deleteTrip(name: string):Promise<Itinerary[]> {
  return axios.delete<Itinerary[]>(`${baseUrl}/itinerary`).then(res => res.data);
  
}
//add place to trip
export function addToItinerary(id: ObjectId, place: Place): Promise<Place[]> {
  return axios.put<Place[]>(`${baseUrl}/itinerary/${id}`, place)
    .then(res => res.data);
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
    .then((res) => res.data);

export function additinerary(itinerary:Itinerary):Promise<Itinerary> {
  return axios.post<Itinerary>(`${baseUrl}/itinerary`, itinerary).then(res => res.data);
}

export function fetchitineraries(user: string):Promise<Itinerary[]> {
  return axios.get<Itinerary[]>(`${baseUrl}/itinerary`, {
    params: { to: user }
  })
  .then(res => res.data)
}