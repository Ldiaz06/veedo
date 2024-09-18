import db from '../../../lib/db';
export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const usuario = await db.query(
                `SELECT u.*, p.contenido AS plantilla_contenido
         FROM usuarios u
         LEFT JOIN plantillas p ON u.plantilla_id = p.id
         WHERE u.id = $1`,
                [id]
            );
            res.status(200).json({ usuario: usuario.rows[0] });
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    } else {
        res.status(405).json({ mensaje: 'Método no permitido' });
    }
}
