import 'dotenv/config';
import { query } from './db.js';

const seed = async () => {
    try {
        console.log('Seeding Database...');

        await query(`DROP TABLE IF EXISTS audit_log CASCADE`);
        await query(`DROP TABLE IF EXISTS complaints CASCADE`);
        await query(`DROP TABLE IF EXISTS users CASCADE`);

        // ── USERS TABLE ──────────────────────────────────────────────────────────
        await query(`
            CREATE TABLE users (
                id VARCHAR(50) PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                name VARCHAR(100) NOT NULL,
                profile_image VARCHAR(255),
                role VARCHAR(20) DEFAULT 'citizen' CHECK (role IN ('citizen', 'worker', 'official'))
            )
        `);

        // ── COMPLAINTS TABLE (single source of truth) ────────────────────────────
        await query(`
            CREATE TABLE complaints (
                id VARCHAR(50) PRIMARY KEY,
                citizen_id VARCHAR(50) REFERENCES users(id),
                assigned_worker_id VARCHAR(50) REFERENCES users(id),
                category VARCHAR(50),
                status VARCHAR(20) DEFAULT 'pending'
                    CHECK (status IN ('pending','assigned','in_progress','completed','verified')),
                priority VARCHAR(20) DEFAULT 'normal'
                    CHECK (priority IN ('normal','high','emergency')),
                escalation_flag BOOLEAN DEFAULT FALSE,
                title VARCHAR(255),
                location VARCHAR(255),
                description TEXT,
                date VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                completed_at TIMESTAMP,
                verified_at TIMESTAMP,
                support_count INT DEFAULT 0,
                image_url VARCHAR(255),
                coordinates JSONB,
                comments JSONB DEFAULT '[]',
                history JSONB DEFAULT '[]'
            )
        `);

        // ── AUDIT LOG TABLE ───────────────────────────────────────────────────────
        await query(`
            CREATE TABLE audit_log (
                id SERIAL PRIMARY KEY,
                complaint_id VARCHAR(50) REFERENCES complaints(id),
                action VARCHAR(100),
                performed_by VARCHAR(50),
                performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                details JSONB
            )
        `);

        // ── SEED USERS ────────────────────────────────────────────────────────────
        const users = [
            // Citizens
            { id: 'user_123', name: 'Alex Johnson', username: 'civic_user_01', img: '/assets/profile_alex.png', role: 'citizen' },
            { id: 'user_456', name: 'Sarah Civic', username: 'sarah_civic', img: 'https://i.pravatar.cc/150?u=sarah', role: 'citizen' },
            { id: 'user_789', name: 'Mike Chennai', username: 'mike_chennai', img: 'https://i.pravatar.cc/150?u=mike', role: 'citizen' },
            { id: 'user_101', name: 'Green Activist', username: 'green_activist', img: 'https://i.pravatar.cc/150?u=green', role: 'citizen' },
            // Workers
            { id: 'worker_01', name: 'Ravi S.', username: 'ravi_worker', img: 'https://i.pravatar.cc/150?u=ravi', role: 'worker' },
            { id: 'worker_02', name: 'David Miller', username: 'david_worker', img: 'https://i.pravatar.cc/150?u=david', role: 'worker' },
            // Officials
            { id: 'off_01', name: 'Officer Rajesh', username: 'official_rajesh', img: 'https://i.pravatar.cc/150?u=rajesh', role: 'official' },
        ];

        for (const u of users) {
            await query(
                `INSERT INTO users (id, username, name, profile_image, role) VALUES ($1, $2, $3, $4, $5)`,
                [u.id, u.username, u.name, u.img, u.role]
            );
        }

        // ── SEED COMPLAINTS ───────────────────────────────────────────────────────
        const complaints = [
            {
                id: '#ISSUE1001',
                citizen_id: 'user_123',
                assigned_worker_id: null,
                category: 'Road',
                status: 'pending',
                priority: 'high',
                escalation_flag: false,
                title: 'Deep pothole near bus stop',
                location: 'Anna Nagar, Chennai',
                description: 'Major safety hazard. This pothole has been growing for weeks.',
                date: '2h ago',
                created_at: new Date(Date.now() - 7200000).toISOString(),
                supportCount: 124,
                image: '/assets/pothole.png',
                coordinates: [80.2201, 13.0850],
                comments: [
                    { id: 1, name: 'Arun Kumar', role: 'Citizen', text: 'Almost crashed here last night!', time: '1h ago', avatar: 'https://i.pravatar.cc/100?u=1' }
                ],
                history: [
                    { stage: 'Reported', status: 'completed', date: 'Mar 1, 10:00 AM' },
                    { stage: 'Assigned', status: 'upcoming', date: '' },
                    { stage: 'In Progress', status: 'upcoming', date: '' },
                    { stage: 'Verified', status: 'upcoming', date: '' }
                ]
            },
            {
                id: '#ISSUE1002',
                citizen_id: 'user_456',
                assigned_worker_id: 'worker_01',
                category: 'Waste',
                status: 'in_progress',
                priority: 'normal',
                escalation_flag: false,
                title: 'Garbage overflow in market area',
                location: 'T Nagar',
                description: 'Waste not collected for 4 days, smell is unbearable.',
                date: '5h ago',
                created_at: new Date(Date.now() - 18000000).toISOString(),
                supportCount: 89,
                image: '/assets/garbage.png',
                coordinates: [80.2337, 13.0405],
                comments: [
                    { id: 3, name: 'Officer Rajesh', role: 'Official', text: 'Truck dispatched.', time: '2h ago', avatar: 'https://i.pravatar.cc/100?u=off1' }
                ],
                history: [
                    { stage: 'Reported', status: 'completed', date: 'Mar 1, 08:00 AM' },
                    { stage: 'Assigned', status: 'completed', date: 'Mar 1, 11:30 AM' },
                    { stage: 'In Progress', status: 'current', date: 'Mar 1, 01:00 PM' },
                    { stage: 'Verified', status: 'upcoming', date: '' }
                ]
            },
            {
                id: '#ISSUE1003',
                citizen_id: 'user_789',
                assigned_worker_id: 'worker_02',
                category: 'Electricity',
                status: 'verified',
                priority: 'normal',
                escalation_flag: false,
                title: 'Streetlight not working',
                location: 'Velachery',
                description: 'Repaired successfully. The street is now safe at night.',
                date: '1d ago',
                created_at: new Date(Date.now() - 86400000).toISOString(),
                supportCount: 245,
                image: '/assets/streetlight.png',
                coordinates: [80.2255, 12.9796],
                comments: [
                    { id: 4, name: 'Meera', role: 'Citizen', text: 'Much safer now!', time: '5h ago', avatar: 'https://i.pravatar.cc/100?u=5' }
                ],
                history: [
                    { stage: 'Reported', status: 'completed', date: 'Feb 28, 09:00 AM' },
                    { stage: 'Assigned', status: 'completed', date: 'Feb 28, 02:00 PM' },
                    { stage: 'In Progress', status: 'completed', date: 'Feb 28, 06:00 PM' },
                    { stage: 'Verified', status: 'completed', date: 'Mar 1, 09:00 AM' }
                ]
            },
            {
                id: '#ISSUE1004',
                citizen_id: 'user_101',
                assigned_worker_id: 'worker_01',
                category: 'Water Supply',
                status: 'assigned',
                priority: 'emergency',
                escalation_flag: true,
                title: 'Main pipe burst at Sector 4',
                location: 'Sector 4, Main Road, North Hills',
                description: 'Main pipe burst reported at Sector 4. Urgent repair needed to prevent flooding.',
                date: '30m ago',
                created_at: new Date(Date.now() - 1800000).toISOString(),
                supportCount: 56,
                image: '/assets/pothole.png',
                coordinates: [80.2300, 13.0500],
                comments: [],
                history: [
                    { stage: 'Reported', status: 'completed', date: 'Mar 2, 02:50 AM' },
                    { stage: 'Assigned', status: 'current', date: 'Mar 2, 03:00 AM' },
                    { stage: 'In Progress', status: 'upcoming', date: '' },
                    { stage: 'Verified', status: 'upcoming', date: '' }
                ]
            },
            {
                id: '#ISSUE1005',
                citizen_id: 'user_123',
                assigned_worker_id: 'worker_02',
                category: 'Road',
                status: 'completed',
                priority: 'high',
                escalation_flag: false,
                title: 'Road crack causing accidents',
                location: 'Anna Nagar West',
                description: 'Large road crack near school zone. Children at risk.',
                date: '6h ago',
                created_at: new Date(Date.now() - 21600000).toISOString(),
                supportCount: 78,
                image: '/assets/pothole.png',
                coordinates: [80.2150, 13.0900],
                comments: [],
                history: [
                    { stage: 'Reported', status: 'completed', date: 'Mar 1, 09:00 PM' },
                    { stage: 'Assigned', status: 'completed', date: 'Mar 1, 10:00 PM' },
                    { stage: 'In Progress', status: 'completed', date: 'Mar 1, 11:00 PM' },
                    { stage: 'Verified', status: 'upcoming', date: '' }
                ]
            }
        ];

        for (const c of complaints) {
            await query(
                `INSERT INTO complaints
                (id, citizen_id, assigned_worker_id, category, status, priority, escalation_flag,
                 title, location, description, date, created_at, support_count, image_url,
                 coordinates, comments, history)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
                [
                    c.id, c.citizen_id, c.assigned_worker_id, c.category, c.status, c.priority,
                    c.escalation_flag, c.title, c.location, c.description, c.date, c.created_at,
                    c.supportCount, c.image,
                    JSON.stringify(c.coordinates), JSON.stringify(c.comments), JSON.stringify(c.history)
                ]
            );
        }

        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding DB:', error);
        process.exit(1);
    }
};

seed();
