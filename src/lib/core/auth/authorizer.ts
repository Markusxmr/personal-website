import {
    CachePolicy,
    GQL_InsertUserProfileOne,
    GQL_UpdateUserProfileByPk,
    GQL_UserProfile
} from '$houdini';
import type { AuthToken } from '$lib/core/auth/authorizer.lib';
import { Authorizer } from '$lib/core/auth/authorizer.lib';
import { browser } from '$app/environment';
import { errorHandler } from '$lib/core/error';
import { store } from '$stores/core';
import { clearStorageAuth, setStorageAuth } from '$lib/core/utils/auth.utils';
import { AUTHORIZER_CLIENT_ID, AUTHORIZER_URL } from '../config';
import { App } from '../enums';

export function authorizer(): Authorizer {
    return new Authorizer({
        authorizerURL: AUTHORIZER_URL,
        redirectURL: window.location.origin,
        clientID: AUTHORIZER_CLIENT_ID // obtain your client id from authorizer dashboard
    });
}

async function handleProfile(data: any) {
    const userId = data?.user?.id;
    const profiles = await GQL_UserProfile.fetch({
        variables: {
            where: {
                authorizer_id: { _eq: userId }
            }
        }
    })

    if (!profiles?.data?.user_profile) {
        const response = await GQL_InsertUserProfileOne.mutate({
            object: {
                authorizer_id: userId,
                domain: {
                    name: App.MUSIC_CODE
                }
            }
        })
    }
}

export async function signup(data: any) {
    if (!browser) return;
    const authorizerRef = authorizer();

    return await authorizerRef
        .signup(data)
        .then(async (response) => {
            await handleProfile(data);
            return response;
        })
}

export async function signin(signinData: any, cb: any = null) {
    if (!browser) return;
    const authorizerRef = authorizer();

    await authorizerRef
        .login(signinData)
        .then(async (data: AuthToken | void | null) => {
            await handleProfile(data);
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

export async function getProfile(token: any) {
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