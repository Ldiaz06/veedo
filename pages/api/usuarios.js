export default function handler(req, res) {
  res.status(200).json({ mensaje: 'API funcionando' });
}
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function crearUsuario(nombre, urlPersonalizada) {
    const res = await pool.query(
        'INSERT INTO usuarios (nombre, url) VALUES ($1, $2)',
        [nombre, urlPersonalizada]
    );
    return res;
}
