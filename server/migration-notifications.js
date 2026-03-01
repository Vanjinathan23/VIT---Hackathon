import 'dotenv/config';
import { query } from './db.js';

const migrate = async () => {
    try {
        console.log('Running migration...');

        await query(`
            CREATE TABLE IF NOT EXISTS notifications (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                recipient_user_id VARCHAR(50) REFERENCES users(id),
                complaint_id VARCHAR(50) REFERENCES complaints(id),
                type VARCHAR(50) CHECK (type IN (
                    'complaint_created',
                    'worker_assigned',
                    'task_started',
                    'task_completed',
                    'complaint_verified',
                    'complaint_rejected',
                    'complaint_escalated'
                )),
                title VARCHAR(255),
                message TEXT,
                is_read BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await query(`CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_user_id)`);
        await query(`CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read)`);
        await query(`CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at)`);

        console.log('Migration successful.');
        process.exit(0);
    } catch (e) {
        console.error('Migration failed:', e);
        process.exit(1);
    }
};

migrate();
