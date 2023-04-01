import { createContext } from 'react';

import { PlaceContextModel } from '../models/PlaceContextModel';


const defaultValue: PlaceContextModel = {
    selectedDestination: {
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
    },
    setDestination: () => {},
  };

const PlaceContext = createContext(defaultValue);

export default PlaceContext;