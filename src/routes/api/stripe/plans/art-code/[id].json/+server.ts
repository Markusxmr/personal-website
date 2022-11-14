import { json, type LoadEvent } from '@sveltejs/kit'
import { plans } from "../plans";

export async function GET({ params }: LoadEvent) {
    const { id } = params;

    return json({
        plan: plans.find(plan => plan?.product?.id === id)
    }, {
        status: 200
    });
}