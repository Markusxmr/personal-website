import { DEFAULT_LOCALE } from '$lib/apps/art-code/constants';
import { waitLocale } from 'svelte-i18n';
import { startClient } from '../lib/i18n/i18n';

startClient();

export async function load(event) {
    // awaits for the loading of the 'en' and 'it' dictionaries
    await waitLocale(DEFAULT_LOCALE);

    return {};
}