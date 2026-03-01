export const api = {
    login: async (email, password) => {
        return new Promise(resolve => {
            setTimeout(() => {
                let role = 'citizen';
                if (email.includes('worker')) role = 'worker';
                else if (email.includes('official') || email.includes('admin')) role = 'official';

                resolve({
                    success: true,
                    id: `user_${Date.now()}`,
                    role,
                    name: email.split('@')[0] || 'User'
                });
            }, 500);
        });
    },

    fetchAssignedTasks: async (useAppStore) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(useAppStore.getState().workerTasks || []);
            }, 100);
        });
    },

    fetchOfficialComplaints: async (useAppStore) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(useAppStore.getState().issues || []);
            }, 100);
        });
    },

    fetchCitizenComplaints: async (useAppStore) => {
        try {
            const res = await fetch('/api/citizen/complaints');
            if (res.ok) {
                return await res.json();
            }
        } catch (e) {
            console.error(e);
        }
        return useAppStore.getState().issues || [];
    },

    startTask: async (id, useAppStore) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const state = useAppStore.getState();
                if (state.updateWorkerTask) {
                    state.updateWorkerTask(id, { status: 'In Progress' });
                }
                resolve({ success: true });
            }, 500);
        });
    },

    completeTask: async (id, reason, useAppStore) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const state = useAppStore.getState();
                if (state.updateWorkerTask) {
                    state.updateWorkerTask(id, { status: 'Completed', resolution: reason });
                }
                resolve({ success: true });
            }, 500);
        });
    },

    assignTask: async (taskId, workerId, useAppStore) => {
        return new Promise(resolve => {
            setTimeout(() => {
                // Mock assignment
                resolve({ success: true });
            }, 500);
        });
    },

    verifyTask: async (taskId, useAppStore) => {
        return new Promise(resolve => {
            setTimeout(() => resolve({ success: true }), 500);
        });
    },

    rejectTask: async (taskId, useAppStore) => {
        return new Promise(resolve => {
            setTimeout(() => resolve({ success: true }), 500);
        });
    },

    escalateTask: async (taskId, reason, useAppStore) => {
        return new Promise(resolve => {
            setTimeout(() => resolve({ success: true }), 500);
        });
    },

    fetchCitizenAccounts: async () => {
        try {
            const res = await fetch('/api/citizen/accounts');
            if (res.ok) {
                return await res.json();
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    },

    switchAccount: async (accountId, useAppStore) => {
        try {
            const res = await fetch('/api/citizen/switch-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accountId })
            });
            if (res.ok) {
                return await res.json();
            }
        } catch (e) {
            console.error(e);
        }
        return { success: false };
    }
};
