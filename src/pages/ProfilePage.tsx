import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { loginSuccess } from '../store/authSlice';
import authService from '../services/authService';
import { getAvatarUrl, handleAvatarError } from '../utils/avatarUtils';
import '../styles/ProfilePage.css';

const ProfilePage: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        address: '',
        avatar_url: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user.full_name || '',
                phone: user.phone || '',
                address: user.address || '',
                avatar_url: user.avatar_url || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const updatedUser = await authService.updateProfile({
                full_name: formData.full_name || undefined,
                phone: formData.phone || undefined,
                address: formData.address || undefined,
                avatar_url: formData.avatar_url || undefined,
            });

            // Update Redux state with new user info
            // We need to keep the token, so we just update the user part
            // Assuming loginSuccess expects { user, access_token }
            // But we don't have the token here easily unless we grab it from localStorage or store
            // A better way might be to have an updateUserInfo action in authSlice, 
            // but for now we can re-fetch current user or just dispatch loginSuccess if we have the token.
            // Actually, authService.getCurrentUser() is better to sync everything.

            const currentUser = await authService.getCurrentUser();
            const token = localStorage.getItem('token');
            if (token) {
                dispatch(loginSuccess({ user: currentUser, access_token: token }));
            }

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.response?.data?.detail || 'Failed to update profile'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-content">
                <div className="page-header">
                    <h2>My Profile</h2>
                </div>

                <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    {message && (
                        <div className={`alert alert-${message.type}`} style={{
                            padding: '10px',
                            marginBottom: '15px',
                            borderRadius: '4px',
                            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                            color: message.type === 'success' ? '#155724' : '#721c24'
                        }}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={user?.username || ''}
                                disabled
                                className="form-control"
                                style={{ backgroundColor: '#e9ecef' }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="form-control"
                                style={{ backgroundColor: '#e9ecef' }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your address"
                            />
                        </div>
                        <div className="form-group">
                            <label>Avatar URL</label>
                            <input
                                type="text"
                                name="avatar_url"
                                value={formData.avatar_url}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="https://example.com/avatar.jpg"
                            />
                            <div style={{ marginTop: '0.5rem' }}>
                                <img
                                    src={getAvatarUrl(formData.avatar_url)}
                                    alt="Avatar Preview"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                                    onError={handleAvatarError}
                                />
                            </div>
                        </div>

                        <div className="form-actions" style={{ marginTop: '20px' }}>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;