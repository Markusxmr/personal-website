import {
    GQL_InsertUserProfileOne,
    GQL_UpdateUserProfileByPk,
    GQL_UserProfile
} from '$houdini';
import type { AuthToken } from '$lib/core/auth/authorizer.lib';
import { Authorizer } from '$lib/core/auth/authorizer.lib';
import { browser } from '$app/environment';
import { errorHandler } from '$lib/core/error';
import { store } from '$stores/core';
import { clearStorageAuth, clearUserData, setStorageAuth } from '$lib/core/utils/auth.utils';
import { AUTHORIZER_CLIENT_ID, AUTHORIZER_URL } from '../config';
import { get } from 'svelte/store';
import { findMembership } from '../services/membership.service';

export function authorizer(): Authorizer {
    return new Authorizer({
        authorizerURL: AUTHORIZER_URL,
        redirectURL: `${window.location.origin}/${get(store)?.meta?.baseUri}`,
        clientID: AUTHORIZER_CLIENT_ID
    });
}

async function linkUserProfile(data: AuthToken | void | null) {
    const userId = data?.user?.id;
    const platform = get(store)?.meta?.app;
    const userProfilesResponse = await GQL_UserProfile.fetch({
        variables: {
            where: {
                authorizer_id: { _eq: userId },
                platform: {
                    _eq: platform,
                }
            }
        }
    })
    const userProfiles = userProfilesResponse?.data?.user_profile;
    const userProfile = userProfiles?.[0];

    if (!userProfile) {
        await GQL_InsertUserProfileOne.mutate({
            object: {
                authorizer_id: userId,
                domain: {
                    name: platform,
                },
                platform: platform,
                email: data?.user?.email
            }
        })
            .catch(error => {
                console.log("error - linkUserProfile, insert: ", error);

            })
    } else {
        GQL_UpdateUserProfileByPk.mutate({
            pk_columns: {
                profile_id: userProfile?.profile_id
            },
            _set: {
                email: data?.user?.email
            }
        })
            .catch(error => {
                console.log("error - linkUserProfile, update: ", error);

            })
    }
}

export async function signup(data: any) {
    if (!browser) return;
    const authorizerRef = authorizer();

    return await authorizerRef
        .signup(data)
        .then(async (response) => {
            await linkUserProfile(data);
            return response;
        })
}

export async function signin(signinData: any, cb: any = null) {
    if (!browser) return;
    const authorizerRef = authorizer();

    await authorizerRef
        .login(signinData)
        .then(async (data: AuthToken | void | null) => {
            await linkUserProfile(data);
            setStorageAuth(data);
            const user = await getProfile();
            const membership = await findMembership({
                variables: {
                    authorizer_id: user?.id,
                    platform: get(store)?.meta?.app
                }
            });
            store.update((state) => ({
                ...state,
                auth: data,
                profile: { ...state.profile, membership }
            }));
        })
        .catch(async (error) => {
            if (cb) cb(error);
            await errorHandler(error);
            clearUserData();
            clearStorageAuth();
        });
}

export async function getProfile(token: any = null) {
    if (!browser) return;
    const authorizerRef = authorizer();
    const access_token = token ? token : localStorage.getItem('access_token') ?? null;

    return await authorizerRef
        .getProfile({
            ...(access_token ? { authorization: `Bearer ${access_token}` } : null)
        })
        .then((profile: any) => {
            store.update((state) => ({ ...state, auth: { ...state.auth, user: profile, } }));
            localStorage.setItem('access_token', access_token ?? '');
            return profile;
        })
        .catch((error) => {
            clearUserData();
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
        clearUserData();
        clearStorageAuth();

    })
        .catch(error => {
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
