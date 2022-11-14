import type { LoadEvent } from '@sveltejs/kit';

export function load(event: LoadEvent) {
    const access_token = event?.url.searchParams.get('access_token');
    return {
        access_token
    };
}