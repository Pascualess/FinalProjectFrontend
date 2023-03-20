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
