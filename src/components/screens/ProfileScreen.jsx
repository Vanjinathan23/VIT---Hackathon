import React from 'react';
import useAppStore from '../../store/useAppStore';
import useNotificationStore from '../../store/useNotificationStore';
import './ProfileScreen.css';

/**
 * ProfileScreen Component
 * 
 * Redesigned based on the provided "My Profile" UI.
 * Features:
 * 1. Professional Header with Edit action.
 * 2. Profile Card with Verified Badge.
 * 3. Stats Grid (Reported, Resolved, Pending).
 * 4. Recent Activity List.
 * 5. Account Settings Menu.
 */
const ProfileScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';

    // Global State
    const user = useAppStore(state => state.user);
    const issues = useAppStore(state => state.issues);
    const drafts = useAppStore(state => state.drafts);
    const navigate = useAppStore(state => state.navigate);
    const logout = useAppStore(state => state.logout);
    const currentRoute = useAppStore(state => state.currentRoute);
    const unreadCount = useNotificationStore(state => state.unreadCount);

    // Derived Data
    const userIssues = issues.filter(issue => issue.userId === user.id);
    const totalReported = userIssues.length;
    const resolvedCount = userIssues.filter(issue => issue.status === 'Verified').length;
    const pendingCount = userIssues.filter(issue => issue.status === 'Pending').length;

    // Recent Activity (Latest 3)
    const recentActivity = [...userIssues].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

    const getStatusType = (status) => {
        switch (status) {
            case 'Verified': return 'RESOLVED';
            case 'Processing': return 'IN PROGRESS';
            case 'Pending': return 'REPORTED';
            default: return status.toUpperCase();
        }
    };

    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case 'lighting':
            case 'electricity': return 'traffic_light';
            case 'road': return 'traffic'; // Standard material symbol
            case 'waste': return 'delete_sweep';
            case 'parks': return 'forest';
            default: return 'construction';
        }
    };

    return (
        <div className={`profile-root ${!isMobile ? 'profile-root--desktop' : 'profile-root--mobile'}`}>

            {/* 1. Header */}
            <header className="profile-header-new">
                <button className="back-btn-top" onClick={() => navigate('home')}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="header-title-new">My Profile</h1>
                <button className="edit-btn-top" onClick={() => navigate('edit-profile')}>
                    <span className="material-symbols-outlined">edit</span>
                </button>
            </header>

            <main className="profile-scroll-area custom-scrollbar">

                {/* 2. User Info Card */}
                <section className="user-info-card">
                    <div className="avatar-wrapper">
                        <img src={user.profileImage} alt={user.username} className="main-avatar-img" />
                        <div className="verified-badge-mini">
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>verified</span>
                        </div>
                    </div>
                    <h2 className="user-name-text">{user.fullName || user.name}</h2>
                    <div className="badge-verified-citizen">
                        VERIFIED CITIZEN
                    </div>
                    <p className="user-meta-text">Member since March 2023 • {user.location}</p>
                </section>

                {/* 3. Stats Grid */}
                <section className="stats-grid-new">
                    <div className="stat-card-new">
                        <span className="stat-num color-blue">{totalReported}</span>
                        <span className="stat-label-new">TOTAL<br />REPORTED</span>
                    </div>
                    <div className="stat-card-new">
                        <span className="stat-num color-green">{resolvedCount}</span>
                        <span className="stat-label-new">ISSUES<br />RESOLVED</span>
                    </div>
                    <div className="stat-card-new">
                        <span className="stat-num color-orange">{pendingCount}</span>
                        <span className="stat-label-new">PENDING<br />ISSUES</span>
                    </div>
                </section>

                {/* 4. Recent Activity */}
                <section className="activity-section">
                    <div className="section-header-row">
                        <h3 className="section-title">Recent Activity</h3>
                        <button className="view-all-link">View All</button>
                    </div>

                    <div className="activity-list">
                        {recentActivity.length > 0 ? recentActivity.map(issue => (
                            <div key={issue.id} className="activity-item-card" onClick={() => {
                                useAppStore.getState().setSelectedIssueId(issue.id);
                                navigate('full-issue-details');
                            }}>
                                <div className={`activity-icon-box ${issue.status.toLowerCase()}`}>
                                    <span className="material-symbols-outlined">{getCategoryIcon(issue.category)}</span>
                                </div>
                                <div className="activity-details">
                                    <span className="item-title">{issue.title}</span>
                                    <span className="item-location">{issue.location}</span>
                                </div>
                                <div className="activity-status-date">
                                    <span className={`status-tag-mini ${issue.status.toLowerCase()}`}>
                                        {getStatusType(issue.status)}
                                    </span>
                                    <span className="item-date">{issue.date}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="empty-activity">No recent activity</div>
                        )}
                    </div>
                </section>

                {/* 5. Account Settings */}
                <section className="settings-section">
                    <h3 className="section-title">Account Settings</h3>
                    <div className="settings-menu-list">
                        <div className="settings-item-row" onClick={() => navigate('edit-profile')}>
                            <div className="settings-left">
                                <span className="material-symbols-outlined">person</span>
                                <span>Edit Profile</span>
                            </div>
                            <span className="material-symbols-outlined arrow">chevron_right</span>
                        </div>
                        <div className="settings-item-row" onClick={() => navigate('draft-list')}>
                            <div className="settings-left">
                                <span className="material-symbols-outlined">description</span>
                                <span>My Drafts ({drafts.length})</span>
                            </div>
                            <span className="material-symbols-outlined arrow">chevron_right</span>
                        </div>
                        <div className="settings-item-row" onClick={() => navigate('notifications')}>
                            <div className="settings-left">
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-symbols-outlined">notifications</span>
                                    {unreadCount > 0 && <span className="unread-badge-wd" style={{ top: -6, right: -6 }}>{unreadCount}</span>}
                                </div>
                                <span>Notifications</span>
                            </div>
                            <span className="material-symbols-outlined arrow">chevron_right</span>
                        </div>
                        <div className="settings-item-row logout-row" onClick={logout}>
                            <div className="settings-left logout-text">
                                <span className="material-symbols-outlined">logout</span>
                                <span>Logout</span>
                            </div>
                            <span className="material-symbols-outlined arrow">chevron_right</span>
                        </div>
                    </div>
                </section>

                <div style={{ height: '40px' }} />
            </main>

            {/* Bottom Nav */}
            {isMobile && (
                <nav className="mobile-nav-central">
                    <div className="nav-item-new" onClick={() => navigate('home')}>
                        <span className="material-symbols-outlined">home</span>
                        <span className="nav-label">Home</span>
                    </div>
                    <div className="nav-item-new" onClick={() => navigate('issue-detail')}>
                        <span className="material-symbols-outlined">map</span>
                        <span className="nav-label">Map</span>
                    </div>

                    <div className="nav-center-plus" onClick={() => navigate('report-issue')}>
                        <div className="plus-btn-inner">
                            <span className="material-symbols-outlined">add</span>
                        </div>
                        <span className="nav-label-center">Report</span>
                    </div>

                    <div className="nav-item-new" onClick={() => navigate('home')}>
                        <span className="material-symbols-outlined">explore</span>
                        <span className="nav-label">Feed</span>
                    </div>
                    <div className={`nav-item-new ${currentRoute === 'profile' ? 'active-new' : ''}`} onClick={() => navigate('profile')}>
                        <span className="material-symbols-outlined">person</span>
                        <span className="nav-label">Profile</span>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default ProfileScreen;
