import { json } from '@sveltejs/kit';
import { plans } from "../plans";

export async function GET(event) {
    return json({
        plans: plans
    }, {
        status: 200,
    });
}