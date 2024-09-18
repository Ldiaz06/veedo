import db from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nombre, urlPersonalizada } = req.body;

        // Validar los datos de entrada
        if (!nombre || !urlPersonalizada) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        try {
            // Comprobar si la URL personalizada ya existe
            const existeUrl = await db.query(
                'SELECT * FROM usuarios WHERE url_personalizada = $1',
                [urlPersonalizada]
            );
            if (existeUrl.rows.length > 0) {
                return res.status(400).json({ mensaje: 'La URL personalizada ya est� en uso' });
            }

            // Insertar en la base de datos si la URL est� disponible
            const result = await db.query(
                'INSERT INTO usuarios (nombre, url_personalizada) VALUES ($1, $2) RETURNING *',
                [nombre, urlPersonalizada]
            );
            res.status(201).json({ mensaje: 'Usuario creado', usuario: result.rows[0] });
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    } else if (req.method === 'GET') {
        try {
            const result = await db.query('SELECT * FROM usuarios');
            res.status(200).json({ usuarios: result.rows });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    } else {
        res.status(405).json({ mensaje: 'M�todo no permitido' });
    }
}