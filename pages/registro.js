import { useState } from 'react';
import styles from '../styles/registro.module.css'; // Importar el archivo de estilos

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [urlPersonalizada, setUrlPersonalizada] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !urlPersonalizada) {
            setMensaje('Todos los campos son obligatorios');
            return;
        }

        try {
            const res = await fetch('/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, urlPersonalizada }),
            });

            const data = await res.json();
            if (data.mensaje === 'Usuario creado') {
                setMensaje('Usuario registrado exitosamente');
            } else {
                setMensaje(data.mensaje);
            }
        } catch (error) {
            setMensaje('Error al registrar usuario');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Registro de Usuario</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="nombre" className={styles.label}>Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="urlPersonalizada" className={styles.label}>URL Personalizada:</label>
                    <input
                        type="text"
                        id="urlPersonalizada"
                        value={urlPersonalizada}
                        onChange={(e) => setUrlPersonalizada(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Registrar</button>
            </form>
            {mensaje && <p className={styles.message}>{mensaje}</p>}
        </div>
    );
};

export default Registro;