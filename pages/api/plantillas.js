import db from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const result = await db.query('SELECT * FROM plantillas');
            res.status(200).json({ plantillas: result.rows });
        } catch (error) {
            console.error('Error al obtener plantillas:', error);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    } else {
        res.status(405).json({ mensaje: 'M�todo no permitido' });
    }
}