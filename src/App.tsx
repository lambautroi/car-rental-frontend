import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, clearLoading } from './store/authSlice';
import authService from './services/authService';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import UserManagement from './pages/admin/UserManagement';
import VehicleStats from './pages/admin/VehicleStats';
import BookingStats from './pages/admin/BookingStats';
import DashboardHome from './pages/admin/DashboardHome';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();

  // Restore authentication on app load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await authService.getCurrentUser();
          dispatch(loginSuccess({ user, access_token: token }));
        } catch (error) {
          console.error('Failed to restore session:', error);
          // Token invalid, clear it
          localStorage.removeItem('token');
        } finally {
          dispatch(clearLoading());
        }
      }
    };

    initAuth();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="vehicles" element={<VehicleStats />} />
          <Route path="bookings" element={<BookingStats />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;