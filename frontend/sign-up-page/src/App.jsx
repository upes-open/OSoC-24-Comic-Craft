// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import CreateAccountForm from './components/CreateAccountForm';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Background>
        <CreateAccountForm />
      </Background>
    </div>
  );
};

export default App;
