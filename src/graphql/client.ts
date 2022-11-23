
import { browser } from '$app/environment';
import type { RequestHandlerArgs, SubscriptionHandler } from '$houdini';
import { HoudiniClient } from '$houdini';
import { createClient as createWSClient } from 'graphql-ws'
import { HASURA_GRAPHQL_ENDPOINT, HASURA_GRAPHQL_WEBSOCKET_ENDPOINT } from '$lib/core/config';

async function fetchQuery({
	fetch,
	text = '',
	variables = {},
}: RequestHandlerArgs) {
	const url = HASURA_GRAPHQL_ENDPOINT;
	const result = await fetch(url, {
		method: 'POST',
		headers: {
			...(browser ? { 'Authorization': `${localStorage?.getItem("access_token") ?? ""}` } : null),
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN_SECRET,
		},
		body: JSON.stringify({
			query: text,
			variables
		})
	});

	return await result.json();
}

// For subscription (client only)
let socketClient: SubscriptionHandler | null = null
if (browser) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	socketClient = createWSClient({
		url: HASURA_GRAPHQL_WEBSOCKET_ENDPOINT,
	})
}

// Export the Houdini client
export default new HoudiniClient(fetchQuery, socketClient)
