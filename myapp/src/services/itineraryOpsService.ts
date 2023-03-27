import { Itinerary } from "../models/itineraryOps";
import axios from "axios";
import { resolve } from "path/posix";

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