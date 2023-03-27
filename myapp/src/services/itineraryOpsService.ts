import { Itinerary } from "../models/itineraryOps";
import axios from "axios";

const baseUrl = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api/";
 
 
export function fetchitinerary():Promise<Itinerary[]> {
  return axios.get<Itinerary[]>(`${baseUrl}/itinerary`)
  .then(res => res.data)
}

export function additinerary(itinerary:Itinerary):Promise<Itinerary> {
  return axios.post<Itinerary>(`${baseUrl}/itinerary`, itinerary).then(res => res.data);
}

export function fetchitineraries(user: string):Promise<Itinerary[]> {
  return axios.get<Itinerary[]>(`${baseUrl}/itinerary`, {
    params: { to: user }
  })
  .then(res => res.data)
}