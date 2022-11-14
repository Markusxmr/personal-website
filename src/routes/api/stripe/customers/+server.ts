import { error, json } from '@sveltejs/kit';
import { errorHandler } from '$lib/core/error';
import stripe from '../stripe';

export async function GET() {
    try {
        const customers = await stripe.customers.list().catch(errorHandler);;

        return json({ customers }, { status: 200 });
    } catch (err: any) {
        throw error(500, err);
    }
}