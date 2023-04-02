import { Itinerary, Place } from "../models/itinerary";
import axios from "axios";
import { ObjectId } from "mongodb";

const baseUrl = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api";

//retrieve  all saved itineraries
export function fetchItineraries(): Promise<Itinerary[]> {
  return axios.get<Itinerary[]>(`${baseUrl}/itinerary`).then((res) => res.data);
}

//add saved itinerary
export function addItinerary(itinerary: Itinerary): Promise<Itinerary> {
  return axios
    .post<Itinerary>(`${baseUrl}/itinerary`, itinerary)
    .then((res) => {
      console.log("New itinerary created:", res.data);
      return res.data;
    })
    .catch((error) => {
      console.error("Error adding itinerary:", error);
      throw error;
    });
}

//add place to trip
export function addToItinerary(place_id: string, place: Place): Promise<Place> {
  return axios
    .put<Place>(`${baseUrl}/itinerary/${place_id}`, place)
    .then((res) => {
      console.log(`Added new place to itinerary`);
      return res.data;
    })
    .catch((error) => {
      console.log(`Error adding place to itinerary`);
      return error;
    });
}

//delete place to a trip
export function deletePlace(
  ObjectId: ObjectId,
  placeId: string
): Promise<Itinerary> {
  return axios
    .delete<Itinerary>(`${baseUrl}/itinerary/${ObjectId}/${placeId}`)
    .then((res) => res.data);
}

export function fetchItinerary(id: string): Promise<Itinerary> {
  return axios
    .get<Itinerary>(`${baseUrl}/itinerary/${id}`, {})
    .then((res) => res.data)
    .then((itinerary) => {
      const startDate = itinerary.startDate;
      const endDate = itinerary.endDate;
      return { ...itinerary, startDate, endDate };
    })
}