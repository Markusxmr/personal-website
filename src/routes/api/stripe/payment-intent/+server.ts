import { error, json } from '@sveltejs/kit';
import { errorHandler } from '$lib/core/error';
import stripe from '../stripe';
import { getCustomer } from '../customer';

export async function POST({ request }) {
    const authorization = request?.headers.get("authorization");
    try {
        const body = await request.json();
        const user = body?.user;
        const customerInstance = await getCustomer({ request, user });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 10000,
            currency: 'eur',
            automatic_payment_methods: {
                enabled: true,
            },
            customer: customerInstance?.id,
        }).catch(errorHandler);

        return json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
    } catch (err: any) {
        throw error(500, err);
    }
}