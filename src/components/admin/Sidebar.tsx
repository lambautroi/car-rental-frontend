import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import '../../styles/Sidebar.css';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        return location.pathname.includes(path) ? 'active' : '';
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Admin Panel</h3>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin/users" className={isActive('/admin/users')}>
                        User Management
                    </Link>
                </li>
                <li>
                    <Link to="/admin/vehicles" className={isActive('/admin/vehicles')}>
                        Vehicle Statistics
                    </Link>
                </li>
                <li>
                    <Link to="/admin/bookings" className={isActive('/admin/bookings')}>
                        Booking Statistics
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-btn-sidebar">Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
