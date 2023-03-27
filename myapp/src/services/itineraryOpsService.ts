import axios, { AxiosResponse } from "axios";
import { Itinerary, Place } from "../models/itinerary;

 const API_URL = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api";


const MONGODB_URI = "mongodb+srv://Pascualess:R5Ohwr8XwYQl9cky@cluster0.dzoqfrq.mongodb.net/?retryWrites=true&w=majority";

export const fetchItinerary = async (): Promise<Itinerary[]> => {
    const response: AxiosResponse = await axios.get(`${API_URL}/itinerary`);
    return response.data;
};


const placeOptions = new placeOptio(MONGODB_URI);

async function connectToDatabase(): Promise<Place> {
  await client.connect();

  const db = client.db();

  const collections: DatabaseCollections = {
    itineraries: db.collection<Itinerary>('itineraries'),
    places: db.collection<Place>('places'),
  };

  return { collections };
}

export async function getItineraries(): Promise<Itinerary[]> {
  const { collections } = await connectToDatabase();

  const itineraries = await collections.itineraries.find().toArray();

  return itineraries;
}

export async function createItinerary(
  itinerary: Omit<Itinerary, '_id'>
): Promise<Itinerary> {
  const { collections } = await connectToDatabase();

  const result = await collections.itineraries.insertOne(itinerary);

  const createdItinerary = result.ops[0];

  return createdItinerary;
}

export async function updateItinerary(
  id: string,
  updates: Omit<Partial<Itinerary>, '_id'>
): Promise<Itinerary | null> {
  const { collections } = await connectToDatabase();

  const filter = { _id: new Object(id) };

  const result = await collections.itineraries.findOneAndUpdate(filter, {
    $set: updates,
  });

  const updatedItinerary = result.value;

  return updatedItinerary;
}

export async function deleteItinerary(id: string): Promise<void> {
  const { collections } = await connectToDatabase();

  const filter = { _id: new Object(id) };

  await collections.itineraries.deleteOne(filter);
}

//   })
//   // ? maxwidth = 1336 & photo_reference={
//   //   photo_reference: string
//   // }&key=AIzaSyCtZRcyHTGawuW5LPfPKt1TExEfgtPGG50
// }