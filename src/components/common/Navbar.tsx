import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';
import { getAvatarUrl, handleAvatarError } from '../../utils/avatarUtils';
import '../../styles/Navbar.css';

const Navbar: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (dropdownOpen && !(e.target as Element).closest('.user-menu-container')) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, [dropdownOpen]);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">CarRental</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="#">About Us</Link>
                <Link to="#">News</Link>
                <Link to="#">Contact</Link>
            </div>
            <div className="navbar-auth">
                {isAuthenticated ? (
                    <div className="user-menu-container">
                        <div className="user-menu-trigger" onClick={toggleDropdown}>
                            <span className="welcome-text">Welcome, {user?.full_name || user?.username}</span>
                            <div className="avatar">
                                <img
                                    src={getAvatarUrl(user?.avatar_url)}
                                    alt="User Avatar"
                                    onError={handleAvatarError}
                                />
                            </div>
                        </div>

                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                        Dashboard
                                    </Link>
                                )}
                                <Link to="/my-bookings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                    My Bookings
                                </Link>
                                <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                    Profile
                                </Link>
                                <button onClick={handleLogout} className="dropdown-item logout-btn-dropdown">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="login-btn">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
