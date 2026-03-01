import React, { useState, useEffect } from 'react';
import useAppStore from '../../store/useAppStore';
import './TaskSessionScreen.css';

const TaskSessionScreen = ({ variant }) => {
    const navigate = useAppStore(state => state.navigate);
    const updateWorkerTaskStatus = useAppStore(state => state.updateWorkerTaskStatus);
    const setWorkerDashboardTab = useAppStore(state => state.setWorkerDashboardTab);
    const setWorkerDashboardSubTab = useAppStore(state => state.setWorkerDashboardSubTab);
    const taskId = useAppStore(state => state.selectedTaskSessionId) || '#CMP-78210';
    const viewMode = useAppStore(state => state.taskSessionViewMode);

    // Mock task data based on the ID or just a generic one
    const workerTasks = useAppStore(state => state.workerTasks);
    const foundTask = workerTasks.find(t => t.id === taskId);

    // Dynamic task data based on the ID or fallback
    const mockTask = {
        id: taskId,
        category: foundTask?.category || 'Water Supply',
        icon: foundTask?.icon || 'water_drop',
        priority: foundTask?.priority || 'EMERGENCY',
        title: foundTask?.title || foundTask?.description || 'Major leakage in main supply line',
        description: foundTask?.description || 'Citizen reports major leakage in the main supply line near the community center...',
        location: foundTask?.location || 'Plot 42, Sector 5, Industrial Area Phase II, Mumbai',
        image: 'https://images.unsplash.com/photo-1541123303191-ba297ef1706a?q=80&w=800',
        citizenName: 'Anonymous Citizen',
        dateSubmitted: 'Oct 24, 08:30 AM',
        initialStatus: foundTask?.status === 'IN_PROGRESS' ? 'In Progress' : (foundTask?.status === 'COMPLETED' ? 'Completed' : 'Assigned'),
        slaTimeInitial: 14 * 60 + 20 // 14 mins 20 seconds
    };

    const [status, setStatus] = useState(mockTask.initialStatus);
    const [slaRemaining, setSlaRemaining] = useState(mockTask.slaTimeInitial);

    // Live SLA Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setSlaRemaining(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatSLA = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}m ${s}s`;
    };

    const handleBack = () => {
        // Go back to the Tasks → Assigned tab
        setWorkerDashboardTab('TASKS');
        setWorkerDashboardSubTab('ASSIGNED');
        navigate('worker-dashboard');
    };

    const handleFinalStartTask = () => {
        updateWorkerTaskStatus(mockTask.id, 'IN_PROGRESS');
        setWorkerDashboardTab('TASKS');
        setWorkerDashboardSubTab('IN_PROGRESS');
        navigate('worker-dashboard');
    };

    return (
        <div className={`ts-container ${variant}`}>
            {/* Header Section */}
            <header className="ts-header">
                <div className="ts-header-left">
                    <button className="ts-back-btn" onClick={handleBack}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="ts-header-title-group">
                        <h1 className="ts-task-id">{mockTask.id}</h1>
                        <span className={`ts-priority-badge ${mockTask.priority.toLowerCase().replace(' ', '-')}`}>
                            {mockTask.priority}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content: 70/30 or 100% Split Layout */}
            <div className="ts-layout">
                {/* Left Area - Task Details */}
                <div className={`ts-main-details ${viewMode === 'details' ? 'full-width' : ''}`}>
                    <div className="ts-detail-card">
                        <div className="ts-top-meta">
                            <span className="ts-category">
                                <span className="material-symbols-outlined">{mockTask.icon}</span>
                                {mockTask.category}
                            </span>
                            <span className="ts-date">{mockTask.dateSubmitted}</span>
                        </div>

                        {viewMode === 'details' && (
                            <>
                                <h2 className="ts-title">{mockTask.title}</h2>

                                <div className="ts-reporter-info">
                                    <span className="material-symbols-outlined">person</span>
                                    Submitted by: <strong>{mockTask.citizenName}</strong>
                                </div>
                            </>
                        )}

                        {viewMode === 'details' && (
                            <div className="ts-description">
                                <h3>Issue Description</h3>
                                <p>{mockTask.description}</p>
                            </div>
                        )}

                        {viewMode === 'details' && mockTask.image && (
                            <div className="ts-image-container">
                                <h3>Uploaded Image</h3>
                                <img src={mockTask.image} alt="Reported issue" className="ts-reported-img" />
                            </div>
                        )}

                        <div className="ts-location">
                            <h3>Location</h3>
                            <div className="ts-location-card">
                                <div className="ts-map-preview">
                                    {/* Mock Map Image */}
                                    <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/80.22,13.08,15/800x200?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTAwMHozN2nyORneJ3In0.mXv6Dn4_9vFByInXwAAnFQ" alt="Map View" />
                                </div>
                                <div className="ts-address-bar">
                                    <span className="material-symbols-outlined">location_on</span>
                                    <p>{mockTask.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Area (30% on desktop) - Actions + Status */}
                {viewMode === 'full' && (
                    <div className="ts-sidebar">
                        <div className="ts-status-panel">
                            <h3>Status Flow</h3>
                            <div className="ts-status-steps">
                                <div className={`ts-step ${status === 'Assigned' || status === 'In Progress' || status === 'Completed' ? 'active' : ''}`}>
                                    <span className="ts-step-icon">1</span>
                                    <span>Assigned</span>
                                </div>
                                <div className={`ts-step-line ${status === 'In Progress' || status === 'Completed' ? 'active' : ''}`}></div>
                                <div className={`ts-step ${status === 'In Progress' || status === 'Completed' ? 'active' : ''}`}>
                                    <span className="ts-step-icon">2</span>
                                    <span>In Progress</span>
                                </div>
                                <div className={`ts-step-line ${status === 'Completed' ? 'active' : ''}`}></div>
                                <div className={`ts-step ${status === 'Completed' ? 'active' : ''}`}>
                                    <span className="ts-step-icon">3</span>
                                    <span>Completed</span>
                                </div>
                            </div>
                        </div>

                        <div className="ts-action-panel">
                            <h3>Action</h3>

                            {status === 'Assigned' && (
                                <button className="ts-btn ts-start-btn" onClick={handleFinalStartTask}>
                                    <span className="material-symbols-outlined">play_arrow</span>
                                    Start Task
                                </button>
                            )}

                            {status === 'In Progress' && (
                                <>
                                    <button className="ts-btn ts-complete-btn" onClick={() => {
                                        updateWorkerTaskStatus(mockTask.id, 'COMPLETED');
                                        setStatus('Completed');
                                        setWorkerDashboardSubTab('COMPLETED');
                                        setWorkerDashboardTab('TASKS');
                                        navigate('worker-dashboard');
                                    }}>
                                        <span className="material-symbols-outlined">check_circle</span>
                                        Mark as Done
                                    </button>
                                    <button className="ts-btn ts-notes-btn">
                                        <span className="material-symbols-outlined">edit_note</span>
                                        Add Work Notes
                                    </button>
                                    <button className="ts-btn ts-upload-btn">
                                        <span className="material-symbols-outlined">add_a_photo</span>
                                        Upload Completion Image
                                    </button>
                                </>
                            )}

                            {status === 'Completed' && (
                                <div className="ts-success-msg">
                                    <span className="material-symbols-outlined">task_alt</span>
                                    Task Completed!
                                </div>
                            )}

                            <div className="ts-escalate-wrapper">
                                <button className="ts-btn ts-escalate-btn">
                                    <span className="material-symbols-outlined">warning</span>
                                    Escalate Issue
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskSessionScreen;
