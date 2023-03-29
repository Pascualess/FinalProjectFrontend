import axios from "axios";
import { NearbySearch } from "../models/nearbySearch";


const key = "AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c";

const baseURL = process.env.REACT_APP_BASE_URL || ""

export function getNearbySearch(
  lat: number,
  lng: number,
  radius: number
): Promise<NearbySearch> {
  const location = `${lat},${lng}`;
  return axios
    .get<NearbySearch>(
      baseURL + "/nearby",
      { params: { location, radius, key } }
    )
    .then((response) => response.data);
}