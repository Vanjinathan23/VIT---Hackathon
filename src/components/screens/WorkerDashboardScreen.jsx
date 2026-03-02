import React from 'react';
import useAppStore from '../../store/useAppStore';
import './WorkerDashboardScreen.css';

const DashboardHome = ({ userName }) => (
    <div className="wd-content-wrapper animate-fade-in">
        <header className="wd-header">
            <div className="wd-user-profile">
                <img alt="Worker Profile" className="wd-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0owyoqzndwEFLgWuZ7_pp-4bCTrAflBC-_m98cfCIuS3x71lRG0HuuS-zHCNDBpyB8p7QKnKsQ0pmztiZbAMSLfBCJt7SqaQT-t18secHF8sFYVgHepiZZ4d9d7TUwzQSCJJ2HDLXFkykzRQ-iw03qnegScGncHO0kCjBnpGA1HnlQ2KCZlSajSfH59TSsQhq9l-DPqawrDTwJvxERVRQieuiNL4uFcPCfM1Z6joWjiis5XVf7eVLw6Gzt6uBhT4UWtFxCjuEOg" />
                <div className="wd-user-info">
                    <h1 className="wd-greeting">Good Morning, {userName}</h1>
                    <p className="wd-role">Field Worker • ID #4429</p>
                </div>
            </div>
            <div className="wd-status">
                <span className="wd-status-dot"></span>
                AVAILABLE
            </div>
        </header>

        <main>
            {/* Today's Overview */}
            <section className="wd-section">
                <h2 className="wd-section-title">
                    <span className="material-symbols-outlined wd-section-icon">analytics</span>
                    Today's Overview
                </h2>
                <div className="wd-overview-scroll">
                    <div className="wd-card wd-card-compact">
                        <div className="wd-icon-box blue">
                            <span className="material-symbols-outlined">assignment</span>
                        </div>
                        <div className="wd-card-number">12</div>
                        <div className="wd-card-label">ASSIGNED TODAY</div>
                    </div>
                    <div className="wd-card wd-card-compact">
                        <div className="wd-icon-box orange">
                            <span className="material-symbols-outlined">pending_actions</span>
                        </div>
                        <div className="wd-card-number">4</div>
                        <div className="wd-card-label">IN PROGRESS</div>
                    </div>
                    {/* Placeholder for exactly matching the third partially hidden card in the image */}
                    <div className="wd-card wd-card-compact" style={{ opacity: 0.5 }}>
                        <div className="wd-icon-box" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <div className="wd-card-number">8</div>
                        <div className="wd-card-label">COMPLETED</div>
                    </div>
                </div>
            </section>

            {/* Performance Snapshot */}
            <section className="wd-section">
                <div className="wd-stats-row">
                    <div className="wd-stat">
                        <span className="material-symbols-outlined wd-stat-icon">timer</span>
                        <div className="wd-stat-content">
                            <div className="wd-stat-title">Avg Res Time</div>
                            <div className="wd-stat-value cursor-default">42m</div>
                        </div>
                    </div>
                    <div className="wd-stat danger">
                        <span className="material-symbols-outlined wd-stat-icon">warning</span>
                        <div className="wd-stat-content">
                            <div className="wd-stat-title">Escalations</div>
                            <div className="wd-stat-value">1</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Your Active Tasks */}
            <section className="wd-section" style={{ paddingBottom: '24px' }}>
                <div className="wd-tasks-header">
                    <h2 className="wd-tasks-title">Your Active Tasks</h2>
                    <button className="wd-filter">
                        Filter
                        <span className="material-symbols-outlined">filter_list</span>
                    </button>
                </div>

                <div className="wd-task-list">
                    {/* Task Card 1: Emergency */}
                    <div className="wd-task">
                        <div className="wd-task-top">
                            <div>
                                <h3 className="wd-task-id">#CMP-78210</h3>
                                <div className="wd-task-tags">
                                    <span className="wd-tag blue">WATER LEAKAGE</span>
                                    <span className="wd-tag red">EMERGENCY</span>
                                </div>
                            </div>
                            <div className="wd-sla">
                                <span className="wd-sla-label">SLA COUNTDOWN</span>
                                <div className="wd-sla-time red">
                                    <span className="material-symbols-outlined">alarm</span>
                                    14m 20s
                                </div>
                            </div>
                        </div>
                        <div className="wd-task-location">
                            <span className="material-symbols-outlined">location_on</span>
                            <p>Plot 42, Sector 5, Industrial Area Phase II, Mumbai</p>
                        </div>
                        <button className="wd-btn primary">
                            View Task
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>

                    {/* Task Card 2: High Priority */}
                    <div className="wd-task">
                        <div className="wd-task-top">
                            <div>
                                <h3 className="wd-task-id">#CMP-78215</h3>
                                <div className="wd-task-tags">
                                    <span className="wd-tag yellow-light">POWER FAULT</span>
                                    <span className="wd-tag orange">HIGH</span>
                                </div>
                            </div>
                            <div className="wd-sla">
                                <span className="wd-sla-label">SLA COUNTDOWN</span>
                                <div className="wd-sla-time orange">
                                    <span className="material-symbols-outlined">alarm</span>
                                    1h 12m
                                </div>
                            </div>
                        </div>
                        <div className="wd-task-location">
                            <span className="material-symbols-outlined">location_on</span>
                            <p>Street 12, Greenway Colony, West Link, Mumbai</p>
                        </div>
                        <button className="wd-btn primary">
                            View Task
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>

                    {/* Task Card 3: In Progress */}
                    <div className="wd-task active">
                        <div className="wd-task-top">
                            <div>
                                <h3 className="wd-task-id">#CMP-78199</h3>
                                <div className="wd-task-tags">
                                    <span className="wd-tag gray">SANITATION</span>
                                    <span className="wd-tag blue">MEDIUM</span>
                                </div>
                            </div>
                            <div className="wd-sla">
                                <span className="wd-pill">IN PROGRESS</span>
                            </div>
                        </div>
                        <div className="wd-task-location">
                            <span className="material-symbols-outlined">location_on</span>
                            <p>Park View Apartments, Block B, Mumbai</p>
                        </div>
                        <button className="wd-btn secondary">
                            Continue Task
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    </div>
);

const TaskDetailView = ({ taskId, onBack }) => (
    <div className="td-container animate-fade-in">
        {/* Header */}
        <div className="td-header">
            <button className="td-back-btn" onClick={onBack}>
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="td-task-id">{taskId}</h1>
            <span className="td-badge-assigned">Assigned</span>
        </div>

        {/* Content */}
        <div className="td-content">
            {/* Tags */}
            <div className="td-tags">
                <div className="td-tag emergency">
                    <span className="material-symbols-outlined">warning</span>
                    EMERGENCY
                </div>
                <div className="td-tag category">
                    <span className="material-symbols-outlined">water_drop</span>
                    Water Supply
                </div>
            </div>

            {/* SLA Card */}
            <div className="td-sla-card">
                <div className="td-sla-info">
                    <div className="td-sla-label">TIME TO RESOLVE</div>
                    <div className="td-sla-value">28m remaining</div>
                </div>
                <span className="material-symbols-outlined td-sla-icon">timer</span>
                <div className="td-progress-container">
                    <div className="td-progress-bar" style={{ width: '75%' }}></div>
                </div>
                <div className="td-sla-warning">CRITICAL: SLA Breach imminent</div>
            </div>

            {/* Description */}
            <div className="td-section">
                <h2 className="td-section-title">ISSUE DESCRIPTION</h2>
                <div className="td-desc-card">
                    <p>
                        Citizen reports major leakage in the main supply line near the community center.
                        Water pressure is extremely low in the surrounding blocks. Visible flooding on the sidewalk.
                    </p>
                </div>
            </div>

            {/* Reported Images */}
            <div className="td-section">
                <h2 className="td-section-title">REPORTED IMAGES</h2>
                <div className="td-images-scroll">
                    <img src="https://images.unsplash.com/photo-1541123303191-ba297ef1706a?q=80&w=300" alt="Leak 1" className="td-reported-img" />
                    <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ec4?q=80&w=300" alt="Leak 2" className="td-reported-img" />
                    <img src="https://images.unsplash.com/photo-1621905251918-48416bd83263?q=80&w=300" alt="Leak 3" className="td-reported-img" />
                </div>
            </div>

            {/* Location */}
            <div className="td-section">
                <h2 className="td-section-title">LOCATION</h2>
                <div className="td-location-card">
                    <div className="td-map-placeholder">
                        <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/80.22,13.08,15/600x300?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTAwMHozN2nyORneJ3In0.mXv6Dn4_9vFByInXwAAnFQ" alt="Map" className="td-map-img" />
                    </div>
                    <div className="td-location-footer">
                        <span className="td-address">122 Community Center Dr, North District</span>
                        <button className="td-map-link">
                            <span className="material-symbols-outlined">explore</span>
                            Open in Maps
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const InProgressContent = ({ onViewDetails }) => (
    <div className="ip-container animate-fade-in">
        <div className="ip-header">
            <div className="ip-title-group">
                <h2 className="ip-main-title">In Progress Tasks (1)</h2>
                <p className="ip-subtitle">Tasks you are currently working on</p>
            </div>
            <div className="ip-header-actions">
                <button className="ip-bell-btn">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="ip-bell-dot"></span>
                </button>
            </div>
        </div>

        {/* Task Card */}
        <div className="ip-task-card">
            <div className="ip-image-container">
                <img
                    src="https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=1000&auto=format&fit=crop"
                    alt="Water Pipe Issue"
                    className="ip-task-image"
                />
                <div className="ip-badge emergency">
                    <span className="material-symbols-outlined">error</span>
                    EMERGENCY
                </div>
            </div>

            <div className="ip-card-content">
                <div className="ip-content-top">
                    <div className="ip-category">WATER SUPPLY</div>
                    <div className="ip-sla-block">
                        <span className="ip-sla-label">SLA COUNTDOWN</span>
                        <div className="ip-sla-time red">
                            <span className="material-symbols-outlined">timer</span>
                            28m 15s
                        </div>
                    </div>
                </div>

                <h3 className="ip-task-id">#CS-1024</h3>
                <p className="ip-task-desc">
                    Main pipe burst reporting at Sector 4. Significant water loss observed near the main junction.
                </p>

                <div className="ip-actions">
                    <button className="ip-btn ip-btn-outline" onClick={() => onViewDetails('#CS-1024')}>
                        <span className="material-symbols-outlined">visibility</span>
                        View Details
                    </button>
                    <button className="ip-btn ip-btn-solid">
                        <span className="material-symbols-outlined">sync</span>
                        Update Status
                    </button>
                </div>
            </div>
        </div>

        {/* Empty State Footer */}
        <div className="ip-empty-footer">
            <div className="ip-check-circle">
                <span className="material-symbols-outlined">check_circle</span>
            </div>
            <h4 className="ip-footer-text">No other active tasks</h4>
            <p className="ip-footer-subtext">Finish your current task to pick more.</p>
        </div>
    </div>
);


const CompletedContent = () => (
    <div className="comp-container animate-fade-in">
        {/* Date Header */}
        <div className="comp-date-section">
            <h2 className="comp-today-date">Tuesday, Oct 24</h2>
            <p className="comp-success-msg">Tasks successfully completed and logged</p>
        </div>

        {/* Stats Summary Cards */}
        <div className="comp-stats-row">
            <div className="comp-stat-card">
                <span className="comp-stat-label">TOTAL COMPLETED</span>
                <div className="comp-stat-value-group">
                    <span className="comp-stat-value">4</span>
                    <span className="comp-dot green"></span>
                </div>
            </div>
            <div className="comp-stat-card">
                <span className="comp-stat-label">AVG TIME</span>
                <div className="comp-stat-value">1.4h</div>
            </div>
        </div>

        {/* Activity Section */}
        <div className="comp-section-title">ACTIVITY HISTORY</div>

        <div className="comp-history-list">
            {/* Task Card 1 */}
            <div className="comp-task-card verified">
                <div className="comp-card-top">
                    <span className="comp-task-id">#CS-29402</span>
                    <span className="comp-priority-tag">MEDIUM</span>
                </div>
                <h3 className="comp-task-title">Pothole Repair</h3>
                <div className="comp-loc-row">
                    <span className="material-symbols-outlined">location_on</span>
                    122 Oak Street, West District
                </div>
                <div className="comp-card-divider"></div>
                <div className="comp-card-footer">
                    <div className="comp-status verified">
                        <span className="material-symbols-outlined">check_circle</span>
                        VERIFIED
                    </div>
                    <div className="comp-time">Completed at 14:20</div>
                </div>
            </div>

            {/* Task Card 2 */}
            <div className="comp-task-card pending">
                <div className="comp-card-top">
                    <span className="comp-task-id">#CS-29388</span>
                    <span className="comp-priority-tag orange">HIGH</span>
                </div>
                <h3 className="comp-task-title">Street Light Maintenance</h3>
                <div className="comp-loc-row">
                    <span className="material-symbols-outlined">location_on</span>
                    Main Square, Central Plaza
                </div>
                <div className="comp-card-divider"></div>
                <div className="comp-card-footer">
                    <div className="comp-status pending">
                        <span className="material-symbols-outlined">schedule</span>
                        PENDING VERIFICATION
                    </div>
                    <div className="comp-time">Completed at 11:45</div>
                </div>
            </div>

            {/* Task Card 3 */}
            <div className="comp-task-card verified">
                <div className="comp-card-top">
                    <span className="comp-task-id">#CS-29312</span>
                    <span className="comp-priority-tag gray">LOW</span>
                </div>
                <h3 className="comp-task-title">Graffiti Removal</h3>
                <div className="comp-loc-row">
                    <span className="material-symbols-outlined">location_on</span>
                    Greenway Park Entrance
                </div>
                <div className="comp-card-divider"></div>
                <div className="comp-card-footer">
                    <div className="comp-status verified">
                        <span className="material-symbols-outlined">check_circle</span>
                        VERIFIED
                    </div>
                    <div className="comp-time">Completed at 09:15</div>
                </div>
            </div>
        </div>
    </div>
);

const MyTasksView = () => {
    const activeSubTab = useAppStore(state => state.workerDashboardSubTab);
    const setActiveSubTab = useAppStore(state => state.setWorkerDashboardSubTab);
    const selectedTaskId = useAppStore(state => state.selectedWorkerTaskId);
    const setSelectedTaskId = useAppStore(state => state.setSelectedWorkerTaskId);

    // Dynamic Title based on tab
    const getHeaderTitle = () => {
        if (activeSubTab === 'IN_PROGRESS') return 'In Progress Tasks (1)';
        if (activeSubTab === 'COMPLETED') return 'Completed Today (4)';
        return 'My Tasks';
    };

    if (selectedTaskId) {
        return <TaskDetailView taskId={selectedTaskId} onBack={() => setSelectedTaskId(null)} />;
    }

    return (
        <div className="wd-content-wrapper mt-wrapper animate-fade-in">
            {/* Header */}
            <div className="mt-header-row">
                <button className="mt-icon-btn" style={{ color: '#3b82f6' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 28 }}>arrow_back</span>
                </button>
                <h1 className="mt-title">{getHeaderTitle()}</h1>
                <button className="mt-icon-btn" style={{ color: '#475569' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
                        {activeSubTab === 'COMPLETED' ? 'calendar_month' : 'tune'}
                    </span>
                </button>
            </div>

            {/* Tabs */}
            <div className="mt-tabs-container">
                <button
                    className={`mt-tab ${activeSubTab === 'ASSIGNED' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('ASSIGNED')}
                >
                    Assigned (2)
                </button>
                <button
                    className={`mt-tab ${activeSubTab === 'IN_PROGRESS' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('IN_PROGRESS')}
                >
                    In Progress (1)
                </button>
                <button
                    className={`mt-tab ${activeSubTab === 'COMPLETED' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('COMPLETED')}
                >
                    Completed (3)
                </button>
            </div>

            {/* Content Area */}
            {activeSubTab === 'IN_PROGRESS' ? (
                <InProgressContent onViewDetails={(id) => setSelectedTaskId(id)} />
            ) : activeSubTab === 'COMPLETED' ? (
                <CompletedContent />
            ) : (
                <div className="mt-list">
                    {activeSubTab === 'ASSIGNED' ? (
                        <>
                            {/* Card 1 */}
                            <div className="mt-card">
                                <div className="mt-card-top">
                                    <span className="mt-tag red">EMERGENCY</span>
                                    <div className="mt-sla">
                                        <div className="mt-sla-time red">
                                            <span className="material-symbols-outlined">alarm</span>
                                            45m left
                                        </div>
                                        <span className="mt-sla-label">SLA COUNTDOWN</span>
                                    </div>
                                </div>
                                <h2 className="mt-id">#CS-1024</h2>
                                <div className="mt-category-row">
                                    <span className="material-symbols-outlined mt-category-icon">water_drop</span>
                                    Water Supply
                                </div>
                                <p className="mt-desc">Main pipe burst reported at Sector 4. Urgent...</p>
                                <div className="mt-loc">
                                    <span className="material-symbols-outlined">location_on</span>
                                    <span>Sector 4, Main Road, North Hills</span>
                                </div>
                                <div className="mt-actions">
                                    <button className="mt-btn outline">Details</button>
                                    <button className="mt-btn solid">Start Task</button>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="mt-card">
                                <div className="mt-card-top">
                                    <span className="mt-tag orange">HIGH PRIORITY</span>
                                    <div className="mt-sla">
                                        <div className="mt-sla-time orange">
                                            <span className="material-symbols-outlined">alarm</span>
                                            2h 15m
                                        </div>
                                        <span className="mt-sla-label">SLA COUNTDOWN</span>
                                    </div>
                                </div>
                                <h2 className="mt-id">#CS-0988</h2>
                                <div className="mt-category-row">
                                    <span className="material-symbols-outlined mt-category-icon" style={{ fontVariationSettings: "'FILL' 0" }}>lightbulb</span>
                                    Street Lighting
                                </div>
                                <p className="mt-desc">3 street lamps flickering at Central Park West...</p>
                                <div className="mt-loc">
                                    <span className="material-symbols-outlined">location_on</span>
                                    <span>Central Park West, Zone 2</span>
                                </div>
                                <div className="mt-actions">
                                    <button className="mt-btn outline">Details</button>
                                    <button className="mt-btn solid">Start Task</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="mt-empty-state" style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 48, marginBottom: 12 }}>task_alt</span>
                            <p>No completed tasks in this session.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Map Preview */}
            {activeSubTab !== 'IN_PROGRESS' && activeSubTab !== 'COMPLETED' && (
                <div className="mt-map-preview">
                    <button className="mt-map-btn">
                        <span className="material-symbols-outlined">map</span>
                        View On Map
                    </button>
                </div>
            )}
        </div>
    );
};



const WorkerDashboardScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';
    const user = useAppStore(state => state.currentUser);
    const logout = useAppStore(state => state.logout);
    const setWorkerDashboardTab = useAppStore(state => state.setWorkerDashboardTab);
    const activeTab = useAppStore(state => state.workerDashboardTab);

    const userName = user?.name ? user.name.split(' ')[0] : 'Ravi';

    return (
        <div className={`worker-dashboard-container ${!isMobile ? 'worker-dashboard-desktop' : ''}`}>

            {activeTab === 'HOME' && <DashboardHome userName={userName} />}
            {activeTab === 'TASKS' && <MyTasksView />}
            {/* Keeping placeholders for MAP and PROFILE views if needed, currently they stay on whatever is active or just show blank */}

            {/* Bottom Nav */}
            <nav className={`wd-bottom-nav ${isMobile ? 'wd-bottom-nav-mobile' : ''}`}>
                <button
                    className={`wd-nav-item ${activeTab === 'HOME' ? 'active' : ''}`}
                    onClick={() => setWorkerDashboardTab('HOME')}
                >
                    <span className="material-symbols-outlined">home</span>
                    <span className="wd-nav-label">HOME</span>
                </button>
                <button
                    className={`wd-nav-item ${activeTab === 'TASKS' ? 'active' : ''}`}
                    onClick={() => setWorkerDashboardTab('TASKS')}
                >
                    <span className="material-symbols-outlined">list_alt</span>
                    <span className="wd-nav-label">TASKS</span>
                </button>
                <button className="wd-nav-item">
                    <span className="material-symbols-outlined">map</span>
                    <span className="wd-nav-label">MAP</span>
                </button>
                <button className="wd-nav-item" onClick={() => logout()} title="Logout">
                    <span className="material-symbols-outlined">person</span>
                    <span className="wd-nav-label">PROFILE</span>
                </button>
            </nav>
        </div>
    );
};

export default WorkerDashboardScreen;
