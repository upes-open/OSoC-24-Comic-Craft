import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Generate from './components/Generate/generate';
import Login from './components/Login/login';
import Navbar from './components/Nav/Navbar';
import Signup from './components/sign_up/signup';
import Feedback from './components/Feedback/feedback';
import './App.css';
import ViewBrowser from './components/Generate/ViewBrowser';
import PrivateComponent from './components/PrivateComp/PrivateComponent';
import Logout from './components/Logout/logout';
import PublicRoute from './components/PublicRoute/PublicRoute';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup', '/logout'];

  return (
    <div className="App">
      {/* Conditionally render Navbar based on the route */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Public routes for logged-out users */}
        <Route element={<PublicRoute restricted={true} />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private routes for logged-in users */}
        <Route element={<PrivateComponent />}>
          <Route path="/generate" element={<Generate />} />
          <Route path="/view-browser" element={<ViewBrowser />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>

        {/* Default and other routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
