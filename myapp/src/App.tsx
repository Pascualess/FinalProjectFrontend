import React from "react";
import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import { SearchForm } from "./components/SearchForm";
import { ProtectedRoutes } from "./config/ProtectedRoutes";
import { Login } from "./components/Login";
import PlaceProvider from "./context/PlaceProvider";
import { SelectNearbyPlaces } from "./components/SelectNearbyPlaces";



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
            <Route path="/nearby" element={<ProtectedRoutes> <SelectNearbyPlaces /> </ProtectedRoutes>} />
        
        </Routes>
        </PlaceProvider>
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
