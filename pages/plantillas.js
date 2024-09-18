import { useEffect, useState } from 'react';

const Plantillas = () => {
    const [plantillas, setPlantillas] = useState([]);

    useEffect(() => {
        const fetchPlantillas = async () => {
            try {
                const res = await fetch('/api/plantillas');
                const data = await res.json();
                setPlantillas(data.plantillas);
            } catch (error) {
                console.error('Error al obtener plantillas:', error);
            }
        };

        fetchPlantillas();
    }, []);

    const handleSeleccionarPlantilla = async (id) => {
        try {
            const res = await fetch('/api/usuarios', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: usuarioId, plantillaId: id }), // Suponiendo que `usuarioId` es el ID del usuario actual
            });

            const data = await res.json();
            if (data.mensaje === 'Plantilla actualizada') {
                alert('Plantilla seleccionada exitosamente');
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            alert('Error al seleccionar plantilla');
        }
    };

    return (
        <div>
            <h2>Seleccionar Plantilla</h2>
            <ul>
                {plantillas.map((plantilla) => (
                    <li key={plantilla.id}>
                        <h3>{plantilla.nombre}</h3>
                        <p>{plantilla.descripcion}</p>
                        <button onClick={() => handleSeleccionarPlantilla(plantilla.id)}>
                            Seleccionar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Plantillas;
