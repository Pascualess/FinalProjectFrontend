import { createContext } from 'react';

import { PlaceContextModel } from '../models/PlaceContextModel';


const defaultValue:PlaceContextModel = {
selectedDestination: {lat:0, lng:0},
setDestination: () => {}
}

const PlaceContext = createContext(defaultValue);

export default PlaceContext;