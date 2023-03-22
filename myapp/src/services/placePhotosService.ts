import { Router, Request, Response } from "express";
import { Photo } from "../models/placePhotos";
import googconfig from "../config/config";
import axios from "axios";

const apiKey = googconfig;

export function getPlacePhotos(photo_reference: string): Promise<Photo> {
  return axios
    .get<Photo>("https://maps.googleapis.com/maps/api/place/photo", {
      params: { photo_reference, apiKey },
    })
    .then((response) => response.data);
}
