import { useEffect, useState } from 'react';

const Perfil = ({ id }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const res = await fetch(`/api/usuarios/${id}`);
                const data = await res.json();
                console.log('Datos del usuario:', data.usuario); // Agrega esta línea
                setUsuario(data.usuario);
            } catch (error) {
                console.error('Error al obtener usuario:', error);
            }
        };

        fetchUsuario();
    }, [id]);


    if (!usuario) {
        return <p>Cargando perfil...</p>;
    }

    // Reemplazar los marcadores de posición en el contenido de la plantilla
    const plantillaHtml = usuario.plantilla_contenido
        ? usuario.plantilla_contenido
            .replace('{{nombre}}', usuario.nombre || 'Nombre no disponible')
            .replace('{{contenido}}', usuario.url_personalizada || 'Contenido no disponible')
        : '<p>Plantilla no disponible</p>';

    return (
        <div dangerouslySetInnerHTML={{ __html: plantillaHtml }} />
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    return { props: { id } };
}

export default Perfil;
