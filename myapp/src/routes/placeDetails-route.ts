import { Router, Request, Response } from "express";
import { PlaceDetails } from "../models/placeDetails";
import googconfig from "../config/config";
import axios from "axios";

const apiKey = googconfig;
let radius = 5000;

export function getTextSearch(
  lat: Number,
  lng: Number,
  radius: Number
): Promise<PlaceDetails> {
  return axios
    .get<PlaceDetails>("https://maps.googleapis.com/maps/api/place/details", {
      params: { lat, lng, radius, apiKey },
    })
    .then((response) => response.data);
}
