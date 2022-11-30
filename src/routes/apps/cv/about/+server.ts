import axios from "axios";
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { HASURA_REST_ENDPOINT } from "$lib/core/config";
import type { RequestEvent } from "./$types";

export async function POST(event: RequestEvent) {
    const request = event?.request;
    const input = await request?.json();
    const response = await axios.post(HASURA_REST_ENDPOINT + "/send-email", { input }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "x-hasura-admin-secret": env.HASURA_ADMIN_SECRET,
        }
    }).
        catch(err => {
            throw error(500, err?.message);
        });

    return json(response, { status: 200 })
}