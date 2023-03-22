import axios from "axios";
import { Router, Request, Response } from "express";
import googconfig from "../config/config";
import { NearbySearch } from "../models/nearbySearch";

const apiKey = googconfig;
let radius = 5000;

export function getNearbySearch(
  lat: Number,
  lng: Number,
  radius: Number
): Promise<NearbySearch> {
  return axios
    .get<NearbySearch>(
      "https://maps.googleapis.com/maps/api/place/nearbysearch",
      { params: { lat, lng, radius, apiKey } }
    )
    .then((response) => response.data);
}
