import React, { useEffect } from 'react';
import useAppStore from '../../store/useAppStore';
import useNotificationStore from '../../store/useNotificationStore';
import './NotificationScreen.css';

const NotificationScreen = ({ variant }) => {
    const navigate = useAppStore(state => state.navigate);
    const { notifications, fetchNotifications, markAsRead, markAllAsRead, startPolling } = useNotificationStore();

    useEffect(() => {
        startPolling();
        fetchNotifications();
    }, []);

    const handleBack = () => {
        const role = useAppStore.getState().currentUser?.role || useAppStore.getState().user?.role;
        if (role === 'worker') navigate('worker-dashboard');
        else if (role === 'official') navigate('official-dashboard');
        else navigate('home');
    };

    const getIcon = (type) => {
        switch (type) {
            case 'complaint_created': return 'add_alert';
            case 'worker_assigned': return 'assignment_ind';
            case 'task_started': return 'play_circle';
            case 'task_completed': return 'check_circle';
            case 'complaint_verified': return 'verified';
            case 'complaint_rejected': return 'cancel';
            case 'complaint_escalated': return 'warning';
            default: return 'notifications';
        }
    };

    return (
        <div className={`notification-screen ${variant === 'desktop' ? 'desktop-view' : 'mobile-view'}`}>
            <div className="notification-header">
                <button className="back-btn" onClick={handleBack}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2>Notifications</h2>
                {notifications.some(n => !n.is_read) && (
                    <button className="read-all-btn" onClick={markAllAsRead}>
                        Mark all read
                    </button>
                )}
            </div>

            <div className="notification-list">
                {notifications.length === 0 ? (
                    <div className="empty-notifications">
                        <span className="material-symbols-outlined">notifications_off</span>
                        <p>No new notifications</p>
                    </div>
                ) : (
                    notifications.map(n => (
                        <div
                            key={n.id}
                            className={`notification-card ${!n.is_read ? 'unread' : ''}`}
                            onClick={() => !n.is_read && markAsRead(n.id)}
                        >
                            <div className="notification-icon">
                                <span className="material-symbols-outlined">{getIcon(n.type)}</span>
                            </div>
                            <div className="notification-content">
                                <h4>{n.title}</h4>
                                <p>{n.message}</p>
                                <span className="notification-time">
                                    {new Date(n.created_at).toLocaleString()}
                                </span>
                            </div>
                            {!n.is_read && <div className="unread-dot"></div>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationScreen;
