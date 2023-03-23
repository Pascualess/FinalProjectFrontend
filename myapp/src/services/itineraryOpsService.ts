import itineraryOps from "../models/itineraryOps";
import axios from "axios";

const baseUrl = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api";

export function fetchitineraryOps():Promise<itineraryOps[]> {
  return axios.get<itineraryOps[]>(`${baseUrl}/itineraryOps`)
  .then(res => res.data)
}

export function additineraryOps(itineraryOps:itineraryOps):Promise<itineraryOps> {
  return axios.post<itineraryOps>(`${baseUrl}/itineraryOps`, itineraryOps).then(res => res.data);
}

export function fetchitineraryOpsTitle(Title: string): Promise<itineraryOps[]> {
    return axios.get<itineraryOps[]>(`${baseUrl}/itineraryOps`, {
        params: { Title: user }
    })
        .then(res => res.data)
}
