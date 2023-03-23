import axios from "axios";
import { TextSearch } from "../models/textSearch";

const baseURL = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api"

export function fetchTextSearch(query:String, radius: Number):Promise<TextSearch> {
  return axios.get<TextSearch>(`${baseURL}`, {
    params: {query: query, radius: radius}
  })
  .then(res => res.data)
}