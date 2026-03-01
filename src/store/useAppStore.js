import { api } from '../services/api.js';
import { create } from 'zustand';

// Global shared state for both Desktop and Mobile views
const useAppStore = create((set) => ({
    // Navigation State
    currentRoute: 'login', // Redirect to login by default or keep 'home' based on logic in App.jsx
    selectedIssueId: null,
    currentAiIssueId: null, // Track which issue is being analyzed in the sidebar
    aiInsightsCache: {}, // Cache for AI results: { issueId: insightData }

    // Auth State
    isAuthenticated: false,
    currentUser: null,

    // Worker Dashboard State
    workerDashboardTab: 'HOME',
    workerDashboardSubTab: 'Assigned',
    selectedWorkerTaskId: null,
    showWorkerUpdateStatus: false,
    workerTasks: [
        {
            id: '#CS-1024',
            category: 'Water Supply',
            icon: 'water_drop',
            priority: 'EMERGENCY',
            status: 'Pending Assignment',
            location: 'Sector 4, Main Road, North Hills',
            sla: '45m left',
            description: 'Main pipe burst reported at Sector 4. Urgent repair needed to prevent flooding.',
            isEmergency: true
        },
        {
            id: '#CS-0988',
            category: 'Street Lighting',
            icon: 'lightbulb',
            priority: 'HIGH PRIORITY',
            status: 'Pending Assignment',
            location: 'Central Park West, Zone 2',
            sla: '2h 15m',
            description: '3 street lamps flickering at Central Park West. Check for loose wiring.',
            isEmergency: false
        },
        {
            id: '#CMP-78210',
            category: 'Water Leakage',
            icon: 'water_drop',
            priority: 'EMERGENCY',
            status: 'Pending Assignment',
            location: 'Plot 42, Sector 5, Industrial Area Phase II, Mumbai',
            sla: '14m 20s',
            description: 'Major water leak reported in the industrial area.',
            isEmergency: true
        },
        {
            id: '#CMP-78215',
            category: 'Power Fault',
            icon: 'bolt',
            priority: 'HIGH PRIORITY',
            status: 'Assigned',
            location: 'Street 12, Greenway Colony, West Link, Mumbai',
            sla: '1h 12m',
            description: 'Total power failure in Street 12. Investigation required.',
            isEmergency: false
        },
        {
            id: '#CMP-78199',
            category: 'Sanitation',
            icon: 'delete',
            priority: 'MEDIUM',
            status: 'In Progress',
            location: 'Park View Apartments, Block B, Mumbai',
            sla: 'IN PROGRESS',
            description: 'Garbage collection and area cleaning.',
            isEmergency: false
        }
    ],
    setWorkerDashboardTab: (tab) => set({ workerDashboardTab: tab }),
    setWorkerDashboardSubTab: (subTab) => set({ workerDashboardSubTab: subTab }),
    setSelectedWorkerTaskId: (id) => set({ selectedWorkerTaskId: id }),
    setShowWorkerUpdateStatus: (val) => set({ showWorkerUpdateStatus: val }),
    addWorkerTask: (task) => set((state) => {
        const exists = state.workerTasks.find(t => t.id === task.id);
        if (exists) return state;
        return { workerTasks: [task, ...state.workerTasks] };
    }),

    updateWorkerTaskStatus: async (id, status) => {
        try {
            if (status.toLowerCase() === 'in progress' || status.toLowerCase() === 'in_progress') {
                await api.startTask(id, useAppStore);
            } else if (status.toLowerCase() === 'completed') {
                await api.completeTask(id, 'Task completed', useAppStore);
            } else if (status.toLowerCase() === 'assigned') {
                // If it's assigning
            }
            // After response, refresh data
            useAppStore.getState().fetchAppData();
        } catch (e) { console.error('Status update failed', e); }
    }
    ,
    updateWorkerTask: (id, updates) => set((state) => ({
        workerTasks: state.workerTasks.map(t => t.id === id ? { ...t, ...updates } : t)
    })),

    // Task Session State
    selectedTaskSessionId: null,
    taskSessionViewMode: 'full', // 'full' or 'details'
    setSelectedTaskSessionId: (id) => set({ selectedTaskSessionId: id }),
    setTaskSessionViewMode: (mode) => set({ taskSessionViewMode: mode }),


    fetchAppData: async () => {
        try {
            const state = useAppStore.getState();
            if (!state.currentUser && !state.user) return;
            const role = state.currentUser ? state.currentUser.role : state.user.role;
            if (role === 'worker') {
                const tasks = await api.fetchAssignedTasks(useAppStore);
                // Map the DB structure to frontend structure
                set({
                    workerTasks: tasks.map(t => ({
                        id: t.id,
                        dbId: t.id,
                        category: t.category,
                        location: t.location,
                        description: t.description,
                        status: t.status, // might need to map DB status to UI status format
                        priority: t.priority
                    }))
                });
            } else if (role === 'official' || role === 'admin') {
                const issues = await api.fetchOfficialComplaints(useAppStore);
                set({ issues: issues.map(i => ({ ...i, id: i.id, history: [] })) });
            } else {
                const issues = await api.fetchCitizenComplaints(useAppStore);
                set({ issues: issues.map(i => ({ ...i, id: i.id, history: i.history || [] })) });
            }
        } catch (e) { console.error('Failed to fetch data', e); }
    },

    login: async (email, password) => {
        try {
            const data = await api.login(email, password);
            if (data.success) {
                // Keep the same role based object
                set({ isAuthenticated: true, currentUser: { id: data.id, role: data.role, email, name: data.name } });
                return { success: true, role: data.role };
            }
        } catch (error) {
            console.error(error);
        }
        return { success: false };
    },
    logout: () => set({ isAuthenticated: false, currentUser: null, currentRoute: 'login' }),


    // Location State
    location: {
        lat: 13.0827, // Default to Chennai
        lon: 80.2707,
        city: 'Chennai',
        country: 'India',
        accuracy: null,
        type: 'default' // 'gps', 'ip', 'default'
    },
    locationPermission: 'prompt', // 'prompt', 'granted', 'denied'
    showLocationModal: false,

    setLocation: (location) => set({ location }),
    setLocationPermission: (permission) => set({ locationPermission: permission }),
    setShowLocationModal: (show) => set({ showLocationModal: show }),

    navigate: (route) => set({ currentRoute: route }),
    setSelectedIssueId: (id) => set({ selectedIssueId: id }),
    setAiIssueId: (id) => set({ currentAiIssueId: id }),
    cacheAiResult: (id, result) => set((state) => ({
        aiInsightsCache: { ...state.aiInsightsCache, [id]: result }
    })),

    // Shared Form State
    formData: {
        username: '',
        email: '',
        message: '',
        // Citizen Registration Fields
        fullName: '',
        phone: '',
        location: '',
        profilePhoto: null
    },
    updateFormField: (field, value) => set((state) => ({
        formData: {
            ...state.formData,
            [field]: value
        }
    })),

    // Shared UI State
    counter: 0,
    incrementCounter: () => set((state) => ({ counter: state.counter + 1 })),
    resetCounter: () => set({ counter: 0 }),

    activeTab: 'details',
    setActiveTab: (tab) => set({ activeTab: tab }),

    // Onboarding Shared State
    currentSlide: 0,
    isAutoPlaying: true,
    setCurrentSlide: (index) => set({ currentSlide: index }),
    setIsAutoPlaying: (status) => set({ isAutoPlaying: status }),
    nextSlide: () => set((state) => ({ currentSlide: (state.currentSlide + 1) % 3 })),
    prevSlide: () => set((state) => ({ currentSlide: (state.currentSlide - 1 + 3) % 3 })),

    // Role Selection State
    selectedRole: 'citizen',
    // User State
    user: {
        id: 'user_123',
        username: 'Alex Johnson',
        fullName: 'Alex Johnson',
        email: 'alex.j@civicstream.org',
        phone: '+1 (555) 012-3456',
        address: '1200 Civic Center Plaza, Apartment 4B',
        city: 'Seattle',
        state: 'Washington',
        pinCode: '98101',
        location: 'Seattle, WA',
        role: 'citizen',
        profileImage: '/assets/profile_alex.png'
    },

    updateUser: (updates) => set((state) => {
        const newUser = { ...state.user, ...updates };
        // Sync fullName and name if only one is updated
        if (updates.fullName && !updates.name) newUser.name = updates.fullName;
        if (updates.name && !updates.fullName) newUser.fullName = updates.name;

        const newCurrentUser = state.currentUser ? { ...state.currentUser, ...updates } : null;
        if (newCurrentUser) {
            if (updates.fullName && !updates.name) newCurrentUser.name = updates.fullName;
            if (updates.name && !updates.fullName) newCurrentUser.fullName = updates.name;
        }

        return {
            user: newUser,
            currentUser: newCurrentUser
        };
    }),

    myCitizenAccounts: [
        { id: 'user_123', name: 'Alex Johnson', username: 'civic_user_01', img: '/assets/profile_alex.png' }
    ],

    switchCitizenAccount: async (account) => {
        try {
            const data = await api.switchAccount(account.id, useAppStore);
            if (data.success) {
                set((state) => {
                    let updatedAccounts = [...state.myCitizenAccounts];
                    if (!updatedAccounts.find(a => a.id === account.id)) {
                        updatedAccounts.push({
                            id: account.id,
                            name: account.name,
                            username: account.username,
                            img: account.img
                        });
                    }

                    return {
                        myCitizenAccounts: updatedAccounts,
                        user: {
                            ...state.user,
                            id: account.id,
                            username: account.username,
                            fullName: account.name,
                            profileImage: account.img
                        },
                        currentUser: {
                            ...(state.currentUser || {}),
                            id: account.id,
                            name: account.name,
                            role: 'citizen'
                        },
                        currentRoute: 'home',
                        currentAiIssueId: null,
                        selectedIssueId: null
                    };
                });
                await useAppStore.getState().fetchAppData();
            }
        } catch (e) {
            console.error('Account switch failed', e);
        }
    },

    // Issues Mock Data
    issues: [
        {
            id: '#ISSUE1001',
            citizen_id: 'user_123',
            userId: 'user_123',
            username: 'civic_user_01',
            author: { name: 'Alex Johnson' },
            profileImage: '/assets/profile_alex.png',
            category: 'Road',
            status: 'Pending Assignment',
            title: 'Deep pothole near bus stop',
            location: 'Anna Nagar, Chennai',
            description: 'Major safety hazard. This pothole has been growing for weeks and is now a significant danger to motorcyclists and small vehicles, especially during rainy days.',
            date: '2h ago',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            supportCount: 124,
            image: '/assets/pothole.png',
            coordinates: [80.2201, 13.0850],
            comments: [
                { id: 1, name: 'Arun Kumar', role: 'Citizen', text: 'I saw a bike almost crash here last night. Needs immediate attention!', time: '1h ago', avatar: 'https://i.pravatar.cc/100?u=1' },
                { id: 2, name: 'Siva', role: 'Citizen', text: 'The municipal office should prioritize this.', time: '30m ago', avatar: 'https://i.pravatar.cc/100?u=2' }
            ],
            history: [
                { stage: 'Reported', status: 'completed', date: 'Feb 28, 10:00 AM' },
                { stage: 'Assigned', status: 'upcoming', date: '' },
                { stage: 'In Progress', status: 'upcoming', date: '' },
                { stage: 'Verified', status: 'upcoming', date: '' }
            ]
        },
        {
            id: '#ISSUE1002',
            citizen_id: 'user_456',
            userId: 'user_456',
            username: 'clean_city_activist',
            author: { name: 'Sarah Civic' },
            profileImage: 'https://i.pravatar.cc/150?u=sarah',
            category: 'Waste',
            status: 'In Progress',
            title: 'Garbage overflow in market area',
            location: 'T Nagar',
            description: 'Waste not collected for 4 days, smell is unbearable. Businesses in the area are being affected by the stench.',
            date: '5h ago',
            createdAt: new Date(Date.now() - 18000000).toISOString(),
            supportCount: 89,
            image: '/assets/garbage.png',
            coordinates: [80.2337, 13.0405],
            comments: [
                { id: 3, name: 'Officer Rajesh', role: 'Official', text: 'We have dispatched a collection truck to the site.', time: '2h ago', avatar: 'https://i.pravatar.cc/100?u=off1' }
            ],
            history: [
                { stage: 'Reported', status: 'completed', date: 'Feb 28, 08:00 AM' },
                { stage: 'Assigned', status: 'completed', date: 'Feb 28, 11:30 AM' },
                { stage: 'In Progress', status: 'current', date: 'Feb 28, 01:00 PM' },
                { stage: 'Verified', status: 'upcoming', date: '' }
            ]
        },
        {
            id: '#ISSUE1003',
            citizen_id: 'user_789',
            userId: 'user_789',
            username: 'night_watchman',
            author: { name: 'Mike Chennai' },
            profileImage: 'https://i.pravatar.cc/150?u=mike',
            category: 'Electricity',
            status: 'Verified',
            title: 'Streetlight not working',
            location: 'Velachery',
            description: 'Repaired successfully. The street is now safe at night. Thank you for the quick response!',
            date: '1d ago',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            supportCount: 245,
            image: '/assets/streetlight.png',
            coordinates: [80.2255, 12.9796],
            comments: [
                { id: 4, name: 'Meera', role: 'Citizen', text: 'Great work! It feels much safer walking home now.', time: '5h ago', avatar: 'https://i.pravatar.cc/100?u=5' }
            ],
            history: [
                { stage: 'Reported', status: 'completed', date: 'Feb 27, 09:00 AM' },
                { stage: 'Assigned', status: 'completed', date: 'Feb 27, 02:00 PM' },
                { stage: 'In Progress', status: 'completed', date: 'Feb 27, 06:00 PM' },
                { stage: 'Verified', status: 'completed', date: 'Feb 28, 09:00 AM' }
            ]
        }
    ],

    // Global Actions
    addIssue: (newIssue) => set((state) => ({
        issues: [
            {
                ...newIssue,
                id: `#ISSUE${1000 + state.issues.length + 1}`,
                citizen_id: state.user.id,
                userId: state.user.id,
                username: state.user.username,
                author: { name: state.user.fullName || state.user.username },
                profileImage: state.user.profileImage,
                status: 'Pending Assignment',
                date: 'Just now',
                createdAt: new Date().toISOString(),
                supportCount: 0,
                comments: [],
                history: [
                    { stage: 'Reported', status: 'completed', date: new Date().toLocaleDateString() },
                    { stage: 'Assigned', status: 'upcoming', date: '' },
                    { stage: 'In Progress', status: 'upcoming', date: '' },
                    { stage: 'Verified', status: 'upcoming', date: '' }
                ]
            },
            ...state.issues
        ]
    })),

    deleteIssue: (id) => set((state) => ({
        issues: state.issues.filter(issue => issue.id !== id)
    })),


    assignTaskToWorker: async (taskId, workerId) => {
        try { await api.assignTask(taskId, workerId, useAppStore); useAppStore.getState().fetchAppData(); } catch (e) { console.error(e) }
    },
    verifyTask: async (taskId) => {
        try { await api.verifyTask(taskId, useAppStore); useAppStore.getState().fetchAppData(); } catch (e) { console.error(e) }
    },
    rejectTask: async (taskId) => {
        try { await api.rejectTask(taskId, useAppStore); useAppStore.getState().fetchAppData(); } catch (e) { console.error(e) }
    },
    escalateTask: async (taskId, reason) => {
        try { await api.escalateTask(taskId, reason, useAppStore); useAppStore.getState().fetchAppData(); } catch (e) { console.error(e) }
    },


    updateIssueStatus: async (id, newStatus) => {
        try {
            if (newStatus === 'Verified') {
                await api.verifyTask(id, useAppStore);
            } else if (newStatus === 'In Progress') { // Rejection case back to in_progress
                await api.rejectTask(id, useAppStore);
            }
            useAppStore.getState().fetchAppData();
        } catch (e) { console.error('Update issue failed', e); }
    }
    ,

    addComment: (issueId, comment) => set((state) => ({
        issues: state.issues.map(issue =>
            issue.id === issueId
                ? {
                    ...issue,
                    comments: [
                        ...issue.comments,
                        {
                            ...comment,
                            id: Date.now(),
                            votes: 0,
                            userVote: null // 'up' or 'down'
                        }
                    ]
                }
                : issue
        )
    })),

    voteIssue: (issueId, type) => set((state) => ({
        issues: state.issues.map(issue => {
            if (issue.id !== issueId) return issue;

            let newCount = issue.supportCount || 0;
            const currentVote = issue.userVote;
            const nextVote = currentVote === type ? null : type;

            // Remove existing vote influence
            if (currentVote === 'up') newCount--;
            if (currentVote === 'down') newCount++;

            // Add new vote influence
            if (nextVote === 'up') newCount++;
            if (nextVote === 'down') newCount--;

            return { ...issue, supportCount: newCount, userVote: nextVote };
        })
    })),

    voteComment: (issueId, commentId, type) => set((state) => ({
        issues: state.issues.map(issue => {
            if (issue.id !== issueId) return issue;
            return {
                ...issue,
                comments: issue.comments.map(comment => {
                    if (comment.id !== commentId) return comment;

                    let newVotes = comment.votes || 0;
                    const currentVote = comment.userVote;
                    const nextVote = currentVote === type ? null : type;

                    if (currentVote === 'up') newVotes--;
                    if (currentVote === 'down') newVotes++;

                    if (nextVote === 'up') newVotes++;
                    if (nextVote === 'down') newVotes--;

                    return { ...comment, votes: newVotes, userVote: nextVote };
                })
            };
        })
    })),

    // Stories Mock Data
    stories: [
        { id: 1, name: 'Your Story', icon: 'account_circle', isUser: true, image: '/assets/profile_alex.png' },
        { id: 2, name: 'Roads', icon: 'traffic', image: '/assets/story_roads.png' },
        { id: 3, name: 'Waste', icon: 'delete', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop' },
        { id: 4, name: 'Water', icon: 'water_drop', image: 'https://images.unsplash.com/photo-1541123303191-ba297ef1706a?q=80&w=600&auto=format&fit=crop' },
        { id: 5, name: 'Parks', icon: 'forest', image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?q=80&w=600&auto=format&fit=crop' },
        { id: 6, name: 'Updates', icon: 'update', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop' }
    ],

    // Global Filter
    activeFilter: 'All Issues',
    setActiveFilter: (filter) => set({ activeFilter: filter }),

    // Drafts Management
    drafts: [],
    addDraft: (draft) => set((state) => ({
        drafts: [...state.drafts, { ...draft, id: `DRAFT_${Date.now()}`, createdAt: new Date().toISOString() }]
    })),
    deleteDraft: (draftId) => set((state) => ({
        drafts: state.drafts.filter(d => d.id !== draftId)
    })),
}));

export default useAppStore;
