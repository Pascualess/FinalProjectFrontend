import React from 'react';
import './App.css';
import AuthContextProvider from './context/AuthContextProvider';
import { Authentication } from './components/Authentication';
import { BrowserRouter } from 'react-router-dom';
import { SearchForm } from './components/SearchForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <SearchForm />
      {/* <AuthContextProvider>
        <Authentication />
      </AuthContextProvider> */}

    </div>
  </BrowserRouter>
  );
}

export default App;
