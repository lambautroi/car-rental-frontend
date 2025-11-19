import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="profile-page">
            <h1>User Profile</h1>
            {user ? (
                <div className="profile-details">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Full Name:</strong> {user.full_name}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                </div>
            ) : (
                <p>No user information available.</p>
            )}
        </div>
    );
};

export default ProfilePage;