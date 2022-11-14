import type { AuthToken } from '$lib/core/auth/authorizer.lib';
import { Authorizer } from '$lib/core/auth/authorizer.lib';
import { browser } from '$app/environment';
import { errorHandler } from '$lib/core/error';
import { store } from '$lib/core/store';
import { clearStorageAuth, setStorageAuth } from '$lib/core/utils/auth.utils';
import { AUTHORIZER_CLIENT_ID, AUTHORIZER_URL } from '../config';

export function authorizer(): Authorizer {
    return new Authorizer({
        authorizerURL: AUTHORIZER_URL,
        redirectURL: window.location.origin,
        clientID: AUTHORIZER_CLIENT_ID // obtain your client id from authorizer dashboard
    });
}

export async function login(loginData: any, cb: any = null) {
    if (!browser) return;
    const authorizerRef = authorizer();

    await authorizerRef
        .login(loginData)
        .then((data: AuthToken | void | null) => {
            store.update((state) => ({ ...state, auth: data }));
            setStorageAuth(data);
        })
        .catch(async (error) => {
            if (cb) cb(error);
            await errorHandler(error);
            store.update((state) => ({ ...state, auth: null }));
            clearStorageAuth();
        });
}

export async function getProfile(token = null) {
    if (!browser) return;
    const authorizerRef = authorizer();
    const access_token = token ? token : localStorage.getItem('access_token') ?? null;

    await authorizerRef
        .getProfile({
            ...(access_token ? { authorization: `Bearer ${access_token}` } : null)
        })
        .then((profile) => {
            store.update((state) => ({ ...state, auth: { user: profile } }));
            localStorage.setItem('access_token', access_token ?? '')
        })
        .catch((error) => {
            store.update((state) => ({ ...state, auth: null }));
            clearStorageAuth();
        });
}

export async function logout() {
    if (!browser) return;

    const access_token = localStorage.getItem('access_token') ?? null;
    if (!access_token) return;

    const authorizerRef = authorizer();

    await authorizerRef.logout({
        authorization: `Bearer ${access_token}`
    }).then(data => {
        store.update((state) => ({ ...state, auth: null }));
        clearStorageAuth();

    }).catch(error => {
        console.log(error.message);
        if (error.message === 'http: named cookie not present') {
            return;
        }
    });

    return new Promise((resolve, reject) => {
        resolve(true);
    })
}

export async function validateToken() {
    const authorizerRef = authorizer();
    return authorizerRef
        .validateJWTToken({
            token_type: 'access_token',
            token: localStorage.getItem('access_token') ?? ''
        })
        .then((data) => {
            return data;
        })
        .catch(errorHandler);
}