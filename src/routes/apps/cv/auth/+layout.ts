import { waitLocale } from 'svelte-i18n';
import { DEFAULT_LOCALE } from '$lib/core/constants';
import { startClient } from '../../../../lib/i18n/i18n';
import type { LoadEvent } from '@sveltejs/kit';

startClient();

export async function load(event: LoadEvent) {
    // awaits for the loading of the 'en' and 'it' dictionaries
    await waitLocale(DEFAULT_LOCALE);

    return {};
}