import { browser } from "$app/environment";
import dotenv from 'dotenv';

export function jwtApiKey() {
    let JWT_API_KEY = "";
    if (browser && !JWT_API_KEY) {
        JWT_API_KEY = window.localStorage.getItem('API_KEY') ?? "";
    } else if (!browser && !JWT_API_KEY) {
        dotenv.config();
        JWT_API_KEY = process.env["ACCESS_TOKEN_READ_WRITE"] ?? "";
    }

    return JWT_API_KEY;
}