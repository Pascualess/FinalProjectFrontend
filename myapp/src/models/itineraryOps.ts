import {ObjectId} from "mongodb";


export default interface optionDetails {
  _id?: ObjectId;
  // Location FROM nearbySearch
  lat: number;
  lng: number;
  // Result from nearbySearch
  name: string;
  formatted_address: string;
  rating: number;
  types: string[];
  formatted_phone_number: string;
    //OpeningHours Placedetail
  weekday_text: string[];

  
}


// export interface Photo {
//   height:number;
//   html_attributions: string[index 0];
//   width:number;
// }