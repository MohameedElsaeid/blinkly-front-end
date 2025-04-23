
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import httpClient from '@/lib/http-client';

// Define types for our auth context
type User = {
    id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    token?: string;
};

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is logged in on mount
    useEffect(() => {
        // Try to get user data from localStorage
        const storedUser = localStorage.getItem('blinkly_user');
        const storedToken = localStorage.getItem('blinkly_token');

        if (storedUser && storedToken) {
            try {
                const userData = JSON.parse(storedUser);
                setUser({...userData, token: storedToken});

                // Also update token in httpClient for API calls
                httpClient.updateToken(storedToken);
            } catch (error) {
                console.error('Failed to parse stored user data:', error);
                localStorage.removeItem('blinkly_user');
                localStorage.removeItem('blinkly_token');
            }
        }

        setIsLoading(false);
    }, []);

    // Login function
    const login = (userData: User) => {
        // Save to state
        setUser(userData);

        // Save to localStorage for persistence
        localStorage.setItem('blinkly_user', JSON.stringify(userData));
        if (userData.token) {
            localStorage.setItem('blinkly_token', userData.token);

            // Also update token in httpClient for API calls
            httpClient.updateToken(userData.token);
        }
    };

    // Logout function
    const logout = () => {
        // Clear state
        setUser(null);

        // Clear localStorage
        localStorage.removeItem('blinkly_user');
        localStorage.removeItem('blinkly_token');
        localStorage.removeItem('blinkly_device_id');

        // Redirect to login
        navigate('/login');
    };

    // Provide the auth context to children
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook for easy access to auth context
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
