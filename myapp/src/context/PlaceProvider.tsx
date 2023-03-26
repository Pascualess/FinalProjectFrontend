import React, { ReactNode, useState } from 'react';
import PlaceContext from './PlaceContext';
import { Location } from '../models/textSearch';
import { PlaceContextModel } from '../models/PlaceContextModel';

export interface IPlaceProviderProps {
  children: ReactNode;
  location: Location
}

const PlaceProvider = ({ children }: IPlaceProviderProps) => {
  const [selectedDestination, setSelectedDestination] = useState<Location>({
    lat: 0,
    lng: 0,
  });

  const setDestination = (place: Location) => {
    setSelectedDestination(place);
  };

  const contextValue: PlaceContextModel = {
    lat: selectedDestination.lat,
    lng: selectedDestination.lng,
    setDestination,
  };

  return (
    <PlaceContext.Provider value={contextValue}>
      {children}
    </PlaceContext.Provider>
  );
};

export default PlaceProvider;