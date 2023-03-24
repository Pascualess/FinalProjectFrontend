import React, { useEffect, useState } from "react";
import { Result, TextSearch } from "../models/textSearch";
import { fetchTextSearch } from "../services/ApiServices";

function PlaceSearch() {
  console.log("test");
  const [query, setQuery] = useState<string>("");
  const [radius, setRadius] = useState<number>(1000); // default radius of 1000 meters
  const [places, setPlaces] = useState<TextSearch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: TextSearch = await fetchTextSearch(query, radius);
      setPlaces(response);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          Radius (meters):
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {places?.results.map((place) => (
          <li>{place.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlaceSearch;