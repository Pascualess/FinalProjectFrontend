import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import { Authentication } from "./components/Authentication";

function App() {
  console.log("Rendering App component...")
  return (
    <BrowserRouter>
      <div className="App">
        <AuthContextProvider>
        <Routes>
          
            <Route path="/login" element={<Authentication />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          
        </Routes>
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
