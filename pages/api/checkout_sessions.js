import stripe from '../../lib/stripe';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { priceId } = req.body;

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${process.env.BASE_URL}/success`,
                cancel_url: `${process.env.BASE_URL}/cancel`,
            });

            res.status(200).json({ url: session.url });
        } catch (error) {
            console.error('Error al crear sesión de checkout:', error);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    } else {
        res.status(405).json({ mensaje: 'Método no permitido' });
    }
}
