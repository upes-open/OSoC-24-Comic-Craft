import React from 'react';
import HomePage from './components/Home/HomePage';
import './App.css';  // Make sure this path is correct based on your actual structure
import Navbar from './components/Nav/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <HomePage />
    </div>
  );
}

export default App;
