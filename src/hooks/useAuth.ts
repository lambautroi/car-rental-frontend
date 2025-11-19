import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import authService from '../services/authService';

const useAuth = () => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(login(user));
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [dispatch]);

    const handleLogin = async (credentials) => {
        const user = await authService.login(credentials);
        dispatch(login(user));
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        authService.logout();
        dispatch(logout());
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        loading,
        handleLogin,
        handleLogout,
    };
};

export default useAuth;