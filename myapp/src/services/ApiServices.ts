import axios from "axios";
import { NearbySearch } from "../models/nearbySearch";
import { PlaceDetails } from "../models/placeDetails";
import { TextSearch } from "../models/textSearch";

const baseURL = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api/";
//get by name options in area
export function fetchTextSearch(
  query: String,
  radius: Number
): Promise<TextSearch> {
  return axios
    .get<TextSearch>(`${baseURL}`, {
      params: { query: query, radius: radius },
    })
    .then((res) => res.data);
}
//finding options in the area
export function fetchNearbySearch(
  lat: number,
  lng: number,
  radius: number
): Promise<NearbySearch> {
  // const location = `${lat},${lng}`;
  return axios
    .get<NearbySearch>(`${baseURL}`, {
      params: { lat,lng, radius },
    })
    .then((response) => response.data);
}
//get photo of option
export function fetchPhoto(photo_reference: String): Promise<any> {
  return axios
    .get<any>(`${baseURL}`, {
      params: { photo_reference: photo_reference },
    })
    .then((res) => res.data);
}
//gets all details of place
export function fetchDetails(placeId: String): Promise<PlaceDetails> {
  return axios
    .get<PlaceDetails>(`${baseURL}`, {
      params: { place_id: placeId },
    })
    .then((res) => res.data);
}
