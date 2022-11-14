import { browser } from '$app/environment';
import { store } from './store';

export function errorHandler(error: any) {
    if (browser) {
        // store.update(state => ({ ...state, notification: { text: JSON.stringify(error), type: 'danger' } }));
        store.update(state => ({ ...state, notification: null }));
    }

    console.error(
        error?.message ??
        error?.response?.data?.error?.message ??
        error?.response?.data?.error?.details?.errors
    );
    return null;
}