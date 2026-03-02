import React from 'react';
import useAppStore from '../../store/useAppStore';

const OfficialDashboardScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';
    const logout = useAppStore(state => state.logout);
    const user = useAppStore(state => state.currentUser);

    return (
        <div style={{ padding: '2rem', fontFamily: 'inherit', background: '#f8fafc', minHeight: '100vh' }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>Official Dashboard</h1>
            <p style={{ color: '#64748b' }}>Welcome, {user?.name || 'Official'}.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#10b981' }}>New Issues</h2>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</p>
                </div>
                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#f59e0b' }}>In Progress</h2>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>5</p>
                </div>
            </div>

            <button
                onClick={logout}
                style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Logout
            </button>
        </div>
    );
};

export default OfficialDashboardScreen;
