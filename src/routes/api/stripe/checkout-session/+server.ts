import { error, json } from '@sveltejs/kit';
import { getCustomer } from "../customer";
import stripe from '../stripe';

export async function POST({ request, url }) {
    try {
        const body = await request.json();
        const user = body?.user;
        const plan = body?.plan;
        const customer = await getCustomer({ request, user });

        if (typeof plan.price.id !== 'string') {
            throw error(400, 'priceId is required');
        }

        const priceId = plan.price.id;
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            customer: customer?.id,
            success_url: `http://${url.host}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://${url.host}/`
        });

        return json({ sessionId: session.id }, { status: 200 });
    } catch (err: any) {
        throw error(500, err);
    }
}
