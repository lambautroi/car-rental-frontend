import React from 'react';
import Navbar from '../components/common/Navbar';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <Navbar />
            <div className="hero-section" style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Welcome to the Car Rental System</h1>
                <p>Your one-stop solution for renting cars effortlessly.</p>
            </div>
        </div>
    );
};

export default HomePage;