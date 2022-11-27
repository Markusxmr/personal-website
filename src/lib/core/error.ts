import { browser } from '$app/environment';
import { store } from '$stores/core';
import { get } from 'svelte/store';

export function errorHandler(error: any) {
    error = error?.extensions ?? error?.message ??
        error?.response?.data?.error?.message ??
        error?.response?.data?.error?.details?.errors;
    if (browser) {
        if (error != "token contains an invalid number of segments") {
            if (get(store).notification?.text !== JSON.stringify(error)) {
                store.update(state => ({ ...state, notification: { text: JSON.stringify(error), type: 'danger' } }));
                setTimeout(() => {
                    store.update(state => ({ ...state, notification: null }));
                }, 1000)
            }

        }
    }

    console.error(error);
    return null;
}