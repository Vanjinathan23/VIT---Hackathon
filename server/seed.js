import 'dotenv/config';
import { query } from './db.js';

const seed = async () => {
    try {
        console.log('Seeding Database...');

        await query(`DROP TABLE IF EXISTS complaints CASCADE`);
        await query(`DROP TABLE IF EXISTS users CASCADE`);

        await query(`
            CREATE TABLE users (
                id VARCHAR(50) PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                name VARCHAR(100) NOT NULL,
                profile_image VARCHAR(255),
                role VARCHAR(20) DEFAULT 'citizen'
            )
        `);

        await query(`
            CREATE TABLE complaints (
                id VARCHAR(50) PRIMARY KEY,
                citizen_id VARCHAR(50) REFERENCES users(id),
                category VARCHAR(50),
                status VARCHAR(50),
                title VARCHAR(255),
                location VARCHAR(255),
                description TEXT,
                date VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                support_count INT DEFAULT 0,
                image_url VARCHAR(255),
                coordinates JSONB,
                comments JSONB DEFAULT '[]',
                history JSONB DEFAULT '[]'
            )
        `);

        // Insert Users
        const users = [
            { id: 'user_123', name: 'Alex Johnson', username: 'civic_user_01', img: '/assets/profile_alex.png' },
            { id: 'user_456', name: 'Sarah Civic', username: 'sarah_civic', img: 'https://i.pravatar.cc/150?u=sarah' },
            { id: 'user_789', name: 'Mike Chennai', username: 'mike_chennai', img: 'https://i.pravatar.cc/150?u=mike' },
            { id: 'user_101', name: 'Green Activist', username: 'green_activist', img: 'https://i.pravatar.cc/150?u=green' },
            { id: 'user_202', name: 'TN Commuter', username: 'tn_commuter', img: 'https://i.pravatar.cc/150?u=tn' },
            { id: 'user_303', name: 'Urban Planner', username: 'urban_planner', img: 'https://i.pravatar.cc/150?u=planner' }
        ];

        for (const user of users) {
            await query(`INSERT INTO users (id, name, username, profile_image) VALUES ($1, $2, $3, $4)`,
                [user.id, user.name, user.username, user.img]
            );
        }

        // Insert Complaints
        const initialIssues = [
            {
                id: '#ISSUE1001',
                citizen_id: 'user_123',
                category: 'Road',
                status: 'Pending Assignment',
                title: 'Deep pothole near bus stop',
                location: 'Anna Nagar, Chennai',
                description: 'Major safety hazard. This pothole has been growing for weeks and is now a significant danger to motorcyclists and small vehicles, especially during rainy days.',
                date: '2h ago',
                created_at: new Date(Date.now() - 7200000).toISOString(),
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
                category: 'Waste',
                status: 'In Progress',
                title: 'Garbage overflow in market area',
                location: 'T Nagar',
                description: 'Waste not collected for 4 days, smell is unbearable. Businesses in the area are being affected by the stench.',
                date: '5h ago',
                created_at: new Date(Date.now() - 18000000).toISOString(),
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
                category: 'Electricity',
                status: 'Verified',
                title: 'Streetlight not working',
                location: 'Velachery',
                description: 'Repaired successfully. The street is now safe at night. Thank you for the quick response!',
                date: '1d ago',
                created_at: new Date(Date.now() - 86400000).toISOString(),
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
        ];

        for (const i of initialIssues) {
            await query(
                `INSERT INTO complaints 
                (id, citizen_id, category, status, title, location, description, date, created_at, support_count, image_url, coordinates, comments, history)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
                [i.id, i.citizen_id, i.category, i.status, i.title, i.location, i.description,
                i.date, i.created_at, i.supportCount, i.image, JSON.stringify(i.coordinates), JSON.stringify(i.comments), JSON.stringify(i.history)]
            );
        }

        console.log('Database seeded successfully!');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding DB:', error);
        process.exit(1);
    }
};

seed();
