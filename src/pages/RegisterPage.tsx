import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import authService from '../services/authService';
import { RootState } from '../store';
import '../styles/Auth.css';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        full_name: '',
        phone: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            dispatch(loginFailure("Passwords do not match"));
            return;
        }

        dispatch(loginStart());
        try {
            // Register
            await authService.register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: 'customer',
                full_name: formData.full_name,
                phone: formData.phone,
            });

            // Auto login after register
            const loginData = await authService.login({ email: formData.email, password: formData.password });
            dispatch(loginSuccess({
                user: {
                    email: formData.email,
                    username: formData.username,
                    role: 'customer',
                    full_name: formData.full_name
                },
                token: loginData.access_token
            }));
            navigate('/');
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || 'Registration failed. Please try again.';
            dispatch(loginFailure(errorMessage));
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Registration</h2>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength={3}
                                placeholder=" "
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder=" "
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label htmlFor="full_name">Full Name</label>
                    </div>

                    <div className="form-group">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            pattern="[0-9]{10,15}"
                            title="Phone number must be 10-15 digits"
                            placeholder=" "
                        />
                        <label htmlFor="phone">Phone</label>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                placeholder=" "
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder=" "
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register Now'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login now</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;