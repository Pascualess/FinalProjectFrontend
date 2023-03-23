import {Location, Result}  from "../models/nearbySearch";
import { OpeningHours } from "../models/placeDetails";
import { Photo } from "../models/placePhotos";
import { Type } from "../models/textSearch";
import axios from "axios";

const baseUrl = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api";
//Unclear where to drop the apikey to test.

//search for options by location based on user input
export function fetchItineraryOptions( city: string, stateCode: string) {
  return (
    axios.get<Result>(`{baseUrl}+"AIzaSyCtZRcyHTGawuW5LPfPKt1TExEfgtPGG5"`, {
      params: {
        City: city || "",
        stateCode: stateCode || "",
      },
    })
      .then((response) => response.data)

      .catch((error) => {
        alert("Invalid search term, please try again");
        console.log(error);
      })
  );

}

//get location details to save and display as part of trip
export function fetchOptionSpecs():Promise<Result[]> {
  return axios.get<Result[]>("https://us-central1-trippin-dc0bc.cloudfunctions.net/api=AIzaSyCtZRcyHTGawuW5LPfPKt1TExEfgtPGG50")
  .then((res: { data: any; }) => res.data)
}

//Get specific location?? were going to use for 25 mile radius search for vacation options
export function fetchlocation(location:Location):Promise<Location> {
  return axios.post<Location>(`${baseUrl}/location`).then(res => res.data);
}


//Part of activity specifics included open hours
export function fetchitOpenHours(weekday_text: string): Promise<OpeningHours[]> {
    return axios.get<OpeningHours[]>(`${baseUrl}/OpenHours`, {
        params: {weekday_text}
    })
        .then(res => res.data)
}

//Element of activity specifics include an image- need to get photo_reference 
export function fetchimage(Photo: any): Promise<Photo() > {
  return axios.get <Photo()>(`${baseUrl}`: {
    .then(res => res.data);
  })
  

}

// ? maxwidth = 1336 & photo_reference={
  //   Photo.photo_reference: string