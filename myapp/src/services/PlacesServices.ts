import axios from 'axios';
import { NearbySearch, PlaceAutocomplete, Result } from '../models/nearbySearch';

export async function searchPlaces(query: string): Promise<Result[]> {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7749,-122.4194&radius=1500&keyword=${query}&key='AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c'`,
    );
  
    if (!response.ok) {
      throw new Error(`Failed to fetch search results: ${response.statusText}`);
    }
  
    const data: NearbySearch = await response.json();
    return data.results;
  }
