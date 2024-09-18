import { useState } from 'react';

const Suscripcion = () => {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async (priceId) => {
        setLoading(true);
        try {
            const res = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId }),
            });

            const { url } = await res.json();
            window.location.href = url;
        } catch (error) {
            console.error('Error al iniciar checkout:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Suscripciones</h2>
            <div>
                <h3>Plan Básico - $10/mes</h3>
                <button onClick={() => handleCheckout('price_id_basico')}>{loading ? 'Cargando...' : 'Suscribirse'}</button>
            </div>
            <div>
                <h3>Plan Premium - $20/mes</h3>
                <button onClick={() => handleCheckout('price_id_premium')}>{loading ? 'Cargando...' : 'Suscribirse'}</button>
            </div>
        </div>
    );
};

export default Suscripcion;
