import axios from "axios";
import { type RequestEvent, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { HASURA_REST_ENDPOINT } from "$lib/core/config";

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
    const request = event?.request;
    const data = await request?.json();

    return axios.post(HASURA_REST_ENDPOINT + "/send-email", { input: data }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "x-hasura-admin-secret": env.HASURA_ADMIN_SECRET,
        }
    })
}