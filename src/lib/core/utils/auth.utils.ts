import { browser } from "$app/environment";
import { store } from "$stores/core";
import type { AuthToken } from "@authorizerdev/authorizer-js";
import { validateToken } from "../auth/authorizer";

export function getLocalAuth() {
    let auth: any;
    if (browser) {
        auth = localStorage.getItem('auth') ?? '';
        auth = auth ? JSON.parse(auth) : null;
        store.update((state) => ({ ...state, auth: auth }));

        validateToken().then(validatedToken => {
            const is_valid = validatedToken?.is_valid ?? false;
            store.update((state) => ({ ...state, isAuthenticated: is_valid }));
        })
    }
}

export function setStorageAuth(data: AuthToken | void | null) {
    if (!browser) return;
    if (data) {
        localStorage.setItem('auth', JSON.stringify(data) ?? '')
    };
    if (data?.id_token) {
        localStorage.setItem('id_token', data?.id_token ?? '')
    };
    if (data?.access_token) {
        localStorage.setItem('access_token', data?.access_token ?? '')
    };
    if (data?.expires_in) {
        localStorage.setItem('expires_in', String(data?.expires_in) ?? '')
    };
    if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data?.user) ?? '')
    };
}

export function clearStorageAuth() {
    if (!browser) return;
    localStorage.removeItem('auth');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('user');
}