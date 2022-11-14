import { BASE_API_URL } from "$lib/apps/art-code/config";
import API from "$lib/apps/art-code/enums/api.enum";
import axios from "axios";

export function client({ authorization }: { authorization: string; }) {
    return axios.create({
        baseURL: `${BASE_API_URL}/api/`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            authorization
        },
        timeout: 15000
    });
}

export async function updateMe(args: { authorization: string; }) {
    return client(args).put(API.STRAPI.PROFILES, args).then(({ data }) => {
        return data;
    });
}