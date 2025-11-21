import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import '../styles/Admin.css';

const AdminDashboard: React.FC = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;