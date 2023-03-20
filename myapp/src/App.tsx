import React from 'react';
import './App.css';
import AuthContextProvider from './context/AuthContextProvider';
import { Authentication } from './components/Authentication';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { SearchForm } from './components/SearchForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';n } from "./components/Authentication";

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
