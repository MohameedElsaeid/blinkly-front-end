import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {isAuthenticated, isLoading} = useAuth();
    const location = useLocation();

    // Show loading state if still checking authentication
    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        // Save the location they were trying to access for redirect after login
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    // If authenticated, render the protected content
    return <>{children}</>;
};

export default ProtectedRoute;
