import React from 'react';
import '../styles/Admin.css';

const MyBookings: React.FC = () => {
    return (
        <div className="admin-container">
            <div className="admin-content">
                <div className="page-header">
                    <h2>My Bookings</h2>
                </div>
                <div className="card">
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <h3>Booking Management Coming Soon</h3>
                        <p>This feature is currently under development.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
