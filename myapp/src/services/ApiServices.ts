import axios from "axios";
import { NearbySearch } from "../models/nearbySearch";
import { PlaceDetails, Result } from "../models/placeDetails";
import { TextSearch } from "../models/textSearch";

const baseURL = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api/map";

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
export function fetchNearbySearch(
  lat: number,
  lng: number,
  radius: number,
  type: string
): Promise<NearbySearch> {
  // const location = `${lat},${lng}`;
  return axios
    .get<NearbySearch>(`${baseURL}`, {
      params: { lat, lng, radius, type },
    })
    .then((response) => response.data);
}
export function fetchPhoto(photo_reference: String): Promise<any> {
  return axios
    .get<any>(`${baseURL}`, {
      params: { photo_reference: photo_reference },
    })
    .then((res) => res.data);
}
export function fetchDetails(placeId: String): Promise<Result> {
  return axios
    .get<PlaceDetails>(`${baseURL}`, {
      params: { place_id: placeId },
    })
    .then((res) => res.data.result);
}
