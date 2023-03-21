import { Router, Request, Response } from "express";
import { TextSearch } from "../models/textSearch";
import googconfig from "../config/config";
import axios from "axios";

const apiKey = googconfig;
let radius = 5000;

export function getTextSearch(
  lat: Number,
  lng: Number,
  radius: Number
): Promise<TextSearch> {
  return axios
    .get<TextSearch>("https://maps.googleapis.com/maps/api/place/textsearch", {
      params: { lat, lng, radius, apiKey },
    })
    .then((response) => response.data);
}
