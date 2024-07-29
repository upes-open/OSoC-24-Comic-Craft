import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ restricted }) => {
  const isLoggedIn = localStorage.getItem('username') !== null;

  if (isLoggedIn && restricted) {
    // Show alert
    alert('You need to log out first to access this page.');
    // Redirect to home page or another page
    return <Navigate to="/generate" />;
  }

  return <Outlet />;
};

export default PublicRoute;
