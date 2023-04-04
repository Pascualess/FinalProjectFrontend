import React, { ReactNode, useState } from 'react';
import PlaceContext from './PlaceContext';
import { Result } from '../models/textSearch';
import { PlaceContextModel } from '../models/PlaceContextModel';

export interface IPlaceProviderProps {
  children: ReactNode;
}

const PlaceProvider = ({ children }: IPlaceProviderProps) => {
const [selectedDestination, setSelectedDestination] = useState<Result>({
  business_status: undefined,
   formatted_address: "",
   geometry: {
     location: {
       lat: 0,
       lng: 0,
     },
     viewport: {
       northeast: {
         lat: 0,
         lng: 0,
       },
       southwest: {
         lat: 0,
         lng: 0,
       },
     },
   },
   name: "",
   opening_hours: {
     open_now: false,
   },
   photos: [],
   place_id: "",
   plus_code: {
     compound_code: "",
     global_code: "",
   },
   price_level: undefined,
   rating: 0,
   reference: "",
   types: [],
   user_ratings_total: 0,
 });

  const setDestination = (place: Result) => {
    setSelectedDestination(place);
  };

  const contextValue: PlaceContextModel = {
    selectedDestination,
    setDestination
  };

  return (
    <PlaceContext.Provider value={contextValue}>
      {children}
    </PlaceContext.Provider>
  );
};

export default PlaceProvider;