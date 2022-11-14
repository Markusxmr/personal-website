import { error, json } from '@sveltejs/kit';
import { HOST_DOMAIN } from "$lib/apps/art-code/config";
import { errorHandler } from "$lib/core/error";
import stripe from '../stripe';

export async function POST({ request, response }) {
    try {
        // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
        // Typically this is stored alongside the authenticated user in your database.
        const { session_id } = request.body;
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

        // This is the url to which the customer will be redirected when they are done
        // managing their billing with the portal.
        const returnUrl = HOST_DOMAIN;

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: checkoutSession.customer,
            return_url: returnUrl,
        }).catch(errorHandler);;

        return json({ portalSession }, { status: 200 });
        return {
            // headers: { Location: portalSession.url },
            // status: 303,
            body: {
                portalSession
            }
        }
    } catch (err: any) {
        throw error(500, err);
    }
}
