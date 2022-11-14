
import { error, json, type LoadEvent } from '@sveltejs/kit';
import { errorHandler } from '$lib/core/error';
import stripe from '../stripe';

export async function GET({ params }: LoadEvent) {
    try {
        const subscriptions = await stripe.subscriptions.list().catch(errorHandler);

        return json({ subscriptions }, { status: 200 });
    } catch (err: any) {
        throw error(500, err);
    }
}

export async function POST(event: LoadEvent) {
    try {
        const subscriptions = await stripe.subscriptions.create({
            customer: "1"
        }).catch(errorHandler);

        return json({ subscriptions }, { status: 200 });
    } catch (err: any) {
        throw error(500, err);
    }
}