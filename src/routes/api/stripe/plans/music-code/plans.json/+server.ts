import { json, type LoadEvent } from '@sveltejs/kit';
import { plans } from "../plans";

export async function GET(event: LoadEvent) {
    return json({
        plans: plans
    }, {
        status: 200,
    });
}