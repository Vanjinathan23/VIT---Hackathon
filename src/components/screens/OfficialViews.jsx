import React, { useState } from 'react';
import useAppStore from '../../store/useAppStore';
import './OfficialDashboardScreen.css'; // inherit dashboard styles

export const UnifiedIssueDetailsModal = ({ taskId, onClose }) => {
    const tasks = useAppStore(state => state.workerTasks);
    const updateTask = useAppStore(state => state.updateWorkerTaskStatus);
    const updateTaskFields = useAppStore(state => state.updateWorkerTask);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [selectedWorkerId, setSelectedWorkerId] = useState('');

    const task = tasks.find(t => t.id === taskId);
    if (!task) return null;

    const handleAssign = () => {
        if (!selectedWorkerId) return alert('Select worker first');
        updateTaskFields(task.id, { status: 'Assigned', workerId: selectedWorkerId });
        onClose();
    };

    const handleEscalate = () => {
        updateTaskFields(task.id, { isEscalated: true });
        alert('Task has been escalated.');
    };

    const handleVerify = () => {
        updateTask(task.id, 'Verified');
        onClose();
    };

    const handleReject = () => {
        if (!rejectReason) return alert('Reason required');
        updateTask(task.id, 'In Progress');
        onClose();
    };

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f7f9fa', overflowY: 'auto' }} className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', position: 'sticky', top: 0, background: '#f7f9fa', zIndex: 10, borderBottom: '1px solid #e2e8f0' }}>
                <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 28 }}>arrow_back</span>
                </button>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Issue Details</div>
                <div style={{ width: 28 }}></div>
            </div>

            <div className="od-card" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>{task.id}</h3>
                    <span className="od-tag blue">{task.status}</span>
                </div>
                {task.isEscalated && <div style={{ color: '#dc2626', fontWeight: 'bold', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><span className="material-symbols-outlined">warning</span> ESCALATED</div>}

                <p style={{ marginTop: '16px', color: '#475569', lineHeight: 1.5 }}>{task.description}</p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px', color: '#64748b', fontSize: '14px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
                    {task.location}
                </div>
            </div>

            <div className="od-card" style={{ marginBottom: '16px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#64748b', textTransform: 'uppercase' }}>Worker Assigned</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="material-symbols-outlined" style={{ padding: '8px', background: '#e2e8f0', borderRadius: '50%' }}>person</span>
                    <span style={{ fontWeight: 600 }}>{['Assigned', 'In Progress', 'Completed', 'Verified'].includes(task.status) ? (task.workerId || 'Ravi S.') : 'Unassigned'}</span>
                </div>
            </div>

            <div className="od-card" style={{ marginBottom: '16px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b', textTransform: 'uppercase' }}>Actions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {task.status === 'Pending Assignment' && (
                        <>
                            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                                <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>SELECT WORKER</label>
                                <select value={selectedWorkerId} onChange={e => setSelectedWorkerId(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '8px' }}>
                                    <option value="">Select a worker...</option>
                                    <option value="Ravi S.">Ravi S. (2 active tasks)</option>
                                    <option value="David Miller">David Miller (1 active task)</option>
                                </select>

                                <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>SET PRIORITY</label>
                                <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}>
                                    <option value="NORMAL">Normal</option>
                                    <option value="HIGH">High Priority</option>
                                    <option value="EMERGENCY">Emergency (Critical)</option>
                                </select>
                            </div>
                            <button className="od-btn primary" onClick={handleAssign} style={{ marginTop: '12px' }}>Confirm Assignment</button>
                        </>
                    )}
                    {task.status === 'Assigned' && (
                        <>
                            <button className="od-btn" style={{ background: '#f1f5f9', color: '#334155' }}>Reassign Worker</button>
                            <button className="od-btn danger" onClick={handleEscalate}>Escalate Task</button>
                        </>
                    )}
                    {task.status === 'In Progress' && (
                        <button className="od-btn danger" onClick={handleEscalate}>Escalate Task</button>
                    )}
                    {task.status === 'Completed' && !showRejectForm && (
                        <>
                            <button className="od-btn primary" onClick={handleVerify}>Verify & Close</button>
                            <button className="od-btn danger" onClick={() => setShowRejectForm(true)}>Send Back to Worker</button>
                        </>
                    )}
                    {task.status === 'Completed' && showRejectForm && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <textarea placeholder="Rejection reason required..." value={rejectReason} onChange={e => setRejectReason(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }} rows={3} />
                            <button className="od-btn danger" onClick={handleReject}>Confirm Rejection</button>
                            <button className="od-btn" style={{ background: '#f1f5f9', color: '#334155' }} onClick={() => setShowRejectForm(false)}>Cancel</button>
                        </div>
                    )}
                    {task.status === 'Verified' && (
                        <div style={{ padding: '12px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="material-symbols-outlined">check_circle</span>
                            Task has been verified and closed.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Generic list view for different states
export const TaskListView = ({ title, filterFn, onOpenTask, onBack }) => {
    const tasks = useAppStore(state => state.workerTasks).filter(filterFn);

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f7f9fa', overflowY: 'auto' }} className="animate-fade-in">
            <div className="od-header" style={{ position: 'sticky', top: 0, background: '#f7f9fa', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={onBack} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
                    </button>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{title}</h2>
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>{tasks.length} total</div>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {tasks.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No records found</div>
                ) : (
                    tasks.map(task => (
                        <div key={task.id} className="od-task active" style={{ padding: '16px' }}>
                            <div className="od-task-top" style={{ marginBottom: '12px' }}>
                                <span className={`od-tag ${task.priority === 'EMERGENCY' ? 'red' : 'blue'}`}>{task.status}</span>
                                {task.isEscalated && <span className="od-tag red" style={{ marginLeft: 8 }}>ESCALATED</span>}
                            </div>
                            <h3 className="od-task-id" style={{ fontSize: '16px', margin: '0 0 8px 0' }}>{task.id}</h3>
                            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.description}</p>
                            <button className="od-btn outline" style={{ background: '#f1f5f9', color: '#3b82f6', padding: '10px' }} onClick={() => onOpenTask(task.id)}>
                                View Details
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
