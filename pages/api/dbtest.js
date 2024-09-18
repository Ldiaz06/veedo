import db from '../../lib/db';

export default async function handler(req, res) {
    try {
        const result = await db.query('SELECT NOW()');
        res.status(200).json({ success: true, time: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al conectar a la base de datos' });
    }
}