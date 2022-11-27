import { error, json } from '@sveltejs/kit';
import { getOrCreateStripeCustomerViaStrapiCMS, getOrCreateStripeCustomerViaApi } from "../stripe-customer";
import stripe from '../stripe';

export async function POST(ctx) {
    try {
        const body = await ctx?.request.json();
        const user = body?.user;
        const plan = body?.plan;
        const platform = body?.platform;
        const url = body?.url;
        // const customerStrapiCMS = await getOrCreateStripeCustomerViaStrapiCMS({ user, platform });
        const customerApiResponse = await getOrCreateStripeCustomerViaApi({ event: ctx, user, platform });
        const metadata = {
            authorizer_id: user?.id,
            code: platform,
            platform,
        }

        if (typeof plan.price.id !== 'string') {
            throw error(400, 'priceId is required');
        }
        const priceId = plan.price.id;
        const session = await stripe.checkout.sessions.create({
            metadata,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            customer: customerApiResponse?.id,
            success_url: `http://${ctx?.url.host}/${url}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://${ctx?.url.host}/${url}/`
        });

        return json({ sessionId: session.id }, { status: 200 });
    } catch (err: any) {
        throw error(500, err);
    }
}
