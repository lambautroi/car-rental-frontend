import React, { useEffect, useState } from 'react';
import authService from '../../services/authService';
import StatCard from '../../components/admin/dashboard/StatCard';
import UserStatsChart from '../../components/admin/dashboard/UserStatsChart';

interface DashboardStats {
    total_users: number;
    verified_users: number;
    customers: number;
    admins: number;
    daily_signups: { date: string; count: number }[];
}

const DashboardHome: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const data = await authService.getStats();
            setStats(data);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
            setError('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading dashboard...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!stats) return null;

    return (
        <div className="admin-page">
            <h2 style={{ marginBottom: '2rem' }}>Dashboard Overview</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <StatCard title="Total Users" value={stats.total_users} color="#007bff" />
                <StatCard title="Verified Users" value={stats.verified_users} color="#28a745" />
                <StatCard title="Customers" value={stats.customers} color="#17a2b8" />
                <StatCard title="Admins" value={stats.admins} color="#ffc107" />
            </div>

            <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <UserStatsChart data={stats.daily_signups} />
            </div>
        </div>
    );
};

export default DashboardHome;
