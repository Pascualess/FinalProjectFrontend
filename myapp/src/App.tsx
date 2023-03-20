import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import { Authentication } from "./components/Authentication";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <AuthContextProvider>
            <Route path="/login" element={<Authentication />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </AuthContextProvider>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
