import { useEffect, useState } from 'react';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch('/api/usuarios');
                const data = await res.json();
                setUsuarios(data.usuarios);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            {usuarios.length > 0 ? (
                <ul>
                    {usuarios.map((usuario) => (
                        <li key={usuario.id}>
                            <p>Nombre: {usuario.nombre}</p>
                            <p>URL Personalizada: {usuario.url_personalizada}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay usuarios registrados.</p>
            )}
        </div>
    );
};

export default Usuarios;