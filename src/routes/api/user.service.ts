import { BASE_API_URL } from '$lib/apps/art-code/config';
import { errorHandler } from '$lib/core/error';
import axios from 'axios';
import fetch from "node-fetch";

const ACCESS_TOKEN_READ_WRITE = process.env.ACCESS_TOKEN_READ_WRITE ?? "";

export async function updateUser(userId, data = null) {
    await axios(`${BASE_API_URL}/api/profiles/me/payment/${userId}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${ACCESS_TOKEN_READ_WRITE}`
        },
        data
    }).catch(errorHandler);
}