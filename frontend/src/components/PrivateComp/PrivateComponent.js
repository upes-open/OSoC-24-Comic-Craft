import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateComponent = () => {
    const location = useLocation();
    const [alertShown, setAlertShown] = useState(false);
    const isLoggedIn = localStorage.getItem('username') !== null;

    useEffect(() => {
        // Check if the user is not logged in and is trying to access a protected route
        if (!isLoggedIn && location.pathname !== '/login') {
            if (!alertShown) {
                // Show alert only once per attempt
                alert('Dear User, Kindly Login first.');
                setAlertShown(true);
            }
        } else {
            // Reset the alertShown flag if user is logged in or on the login page
            setAlertShown(false);
        }
    }, [isLoggedIn, location.pathname, alertShown]);

    // Redirect to login page if the user is not logged in
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateComponent;
