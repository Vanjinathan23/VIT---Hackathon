import { create } from 'zustand';
import { api } from '../services/api.js';
import useAppStore from './useAppStore.js';

const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    isPolling: false,

    fetchNotifications: async () => {
        const { currentUser, user } = useAppStore.getState();
        const userId = currentUser?.id || user?.id;
        if (!userId) return;

        const notifications = await api.fetchNotifications(userId);
        const unreadCount = await api.fetchUnreadNotificationCount(userId);

        set({ notifications, unreadCount });
    },

    markAsRead: async (notificationId) => {
        await api.markNotificationRead(notificationId);
        // Optimistic update
        set((state) => ({
            notifications: state.notifications.map((n) =>
                n.id === notificationId ? { ...n, is_read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
        }));
    },

    markAllAsRead: async () => {
        const { currentUser, user } = useAppStore.getState();
        const userId = currentUser?.id || user?.id;
        if (!userId) return;

        await api.markAllNotificationsRead(userId);
        // Optimistic update
        set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, is_read: true })),
            unreadCount: 0,
        }));
    },

    startPolling: () => {
        if (get().isPolling) return;
        set({ isPolling: true });

        get().fetchNotifications();
        const intervalId = setInterval(() => {
            get().fetchNotifications();
        }, 15000); // Poll every 15 seconds

        set({ intervalId });
    },

    stopPolling: () => {
        const { intervalId } = get();
        if (intervalId) {
            clearInterval(intervalId);
            set({ isPolling: false, intervalId: null });
        }
    }
}));

export default useNotificationStore;
