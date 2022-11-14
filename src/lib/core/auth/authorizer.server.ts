import { Authorizer } from '$lib/core/auth/authorizer.lib';
import { browser } from '$app/environment';
import { errorHandler } from '$lib/core/error';
import { store } from '$lib/core/store';
import { clearStorageAuth } from '$lib/core/utils/auth.utils';
import { AUTHORIZER_CLIENT_ID, AUTHORIZER_URL, VITE_AUTHORIZER_REDIRECT_URL } from '$lib/core/config';

export function authorizer(): Authorizer {
    return new Authorizer({
        authorizerURL: AUTHORIZER_URL,
        redirectURL: VITE_AUTHORIZER_REDIRECT_URL,
        clientID: AUTHORIZER_CLIENT_ID // obtain your client id from authorizer dashboard
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


export async function validateTokenServer(access_token = "") {
    const authorizerRef = authorizer();
    return authorizerRef
        .validateJWTToken({
            token_type: 'access_token',
            token: access_token
        })
        .then((data) => {
            return data
        })
        .catch(errorHandler);
}