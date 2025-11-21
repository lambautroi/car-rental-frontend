import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = '#007bff' }) => {
    return (
        <div style={{
            backgroundColor: color,
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
        }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', opacity: 0.9 }}>{title}</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</div>
        </div>
    );
};

export default StatCard;
