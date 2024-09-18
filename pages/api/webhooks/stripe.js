import { buffer } from 'micro';
import stripe from '../../../lib/stripe';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];

        try {
            const event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET);

            if (event.type === 'checkout.session.completed') {
                const session = event.data.object;

                if (event.type === 'checkout.session.completed') {
                    const session = event.data.object;

                    // Actualiza la base de datos con la suscripci�n activa y fecha de expiraci�n
                    await db.query(
                        'UPDATE usuarios SET suscripcion_activa = TRUE, fecha_expiracion = $1 WHERE id = $2',
                        [new Date(session.current_period_end * 1000), session.client_reference_id] // Suponiendo que client_reference_id es el ID del usuario
                    );
                }

                console.log('Suscripci�n completada:', session);
            }

            res.status(200).json({ received: true });
        } catch (error) {
            console.error('Error al manejar webhook:', error);
            res.status(400).json({ error: 'Webhook error' });
        }
    } else {
        res.status(405).json({ mensaje: 'M�todo no permitido' });
    }
}
