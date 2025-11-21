import React, { useEffect, useState } from 'react';
import authService from '../../services/authService';
import { User } from '../../types/user';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentUser, setCurrentUser] = useState<Partial<User>>({});

    // Form state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'customer',
        full_name: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await authService.getAllUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openAddModal = () => {
        setModalMode('add');
        setFormData({
            username: '',
            email: '',
            password: '',
            role: 'customer',
            full_name: '',
            phone: '',
            address: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setModalMode('edit');
        setCurrentUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            password: '', // Password not editable directly here
            role: user.role,
            full_name: user.full_name || '',
            phone: user.phone || '',
            address: user.address || ''
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUser({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Sanitize form data: convert empty strings to undefined
            const sanitizedData = { ...formData };
            if (!sanitizedData.full_name) delete (sanitizedData as any).full_name;
            if (!sanitizedData.phone) delete (sanitizedData as any).phone;
            if (!sanitizedData.address) delete (sanitizedData as any).address;

            if (modalMode === 'add') {
                await authService.register(sanitizedData as User);
            } else {
                if (currentUser._id) {
                    // Only send fields that are allowed to be updated
                    const updateData: any = {};
                    if (formData.full_name) updateData.full_name = formData.full_name;
                    if (formData.phone) updateData.phone = formData.phone;
                    if (formData.address) updateData.address = formData.address;

                    await authService.updateUser(currentUser._id, updateData);
                }
            }
            closeModal();
            fetchUsers();
        } catch (err: any) {
            console.error('Failed to save user:', err);
            const errorMessage = err.response?.data?.detail || 'Failed to save user. Please check your input.';
            alert(Array.isArray(errorMessage) ? errorMessage[0].msg : errorMessage);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await authService.deleteUser(id);
                fetchUsers();
            } catch (err) {
                console.error('Failed to delete user:', err);
                alert('Failed to delete user');
            }
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-page">
            <div className="page-header">
                <h2>User Management</h2>
                <button className="btn-add" onClick={openAddModal}>Add New User</button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge badge-${user.role}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>{user.full_name || '-'}</td>
                                <td>{user.phone || '-'}</td>
                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => openEditModal(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => user._id && handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{modalMode === 'add' ? 'Add New User' : 'Edit User'}</h3>
                            <button onClick={closeModal} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            {modalMode === 'add' && (
                                <>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Role</label>
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn-save">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
