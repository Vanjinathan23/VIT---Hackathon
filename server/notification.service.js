import { query } from './db.js';

export async function createNotification(recipient_user_id, complaint_id, type, title, message, client = null) {
    if (!recipient_user_id) return;
    try {
        const text = `INSERT INTO notifications (recipient_user_id, complaint_id, type, title, message) VALUES ($1, $2, $3, $4, $5)`;
        const values = [recipient_user_id, complaint_id, type, title, message];
        if (client) {
            await client.query(text, values);
        } else {
            await query(text, values);
        }
    } catch (e) {
        console.error('Notification creation failed:', e);
    }
}

export async function notifyAllOfficials(complaint_id, type, title, message, client = null) {
    try {
        const q = `SELECT id FROM users WHERE role='official'`;
        const officials = client ? await client.query(q) : await query(q);
        for (const off of officials.rows) {
            await createNotification(off.id, complaint_id, type, title, message, client);
        }
    } catch (e) {
        console.error('Notify officials failed:', e);
    }
}
