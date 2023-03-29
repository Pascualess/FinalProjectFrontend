import React from "react";
import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import { SearchForm } from "./components/SearchForm";
import { ProtectedRoutes } from "./config/ProtectedRoutes";
import { Login } from "./components/Login";
import PlaceProvider from "./context/PlaceProvider";
import { SelectNearbyPlaces } from "./components/SelectNearbyPlaces";
import { ItinerariesPage } from "./components/ItinerariesPage";
import { addItinerary } from "./services/itineraryOpsService";

function App() {
  console.log("Rendering App component...")
  return (
    <BrowserRouter>
      <div className="App">
        <AuthContextProvider>
          <PlaceProvider>
        <Routes>
          
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
            <Route path="/home" element={<ProtectedRoutes> <SearchForm /> </ProtectedRoutes>} />
            <Route path="/nearby" element={<ProtectedRoutes> <SelectNearbyPlaces addItinerary={addItinerary}  /> </ProtectedRoutes>} />
            {/* <Route path="/itinerary" element={<ProtectedRoutes> <ItinerariesPage /> </ProtectedRoutes>} /> */}
        
        </Routes>
        </PlaceProvider>
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
