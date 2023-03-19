import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthContextProvider from './context/AuthContextProvider';
import { Authentication } from './components/Authentication';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Authentication />
      </AuthContextProvider>
    </div>
  );
}

export default App;
