/// <reference types="@sveltejs/kit" />

import * as Authorizer from "@authorizerdev/authorizer-js";
import type WaveSurfer from "wavesurfer.js";
import type { NatsConnection } from "nats.ws";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

type Player = {
	wavesurfer: WaveSurfer,
	initPlayer: () => void,
	loadMusic: (song: string) => void,
	playMusic: () => void,
	pauseMusic: () => void,
	setVolume: (volume: number) => void,
}

declare global {
	interface Window {
		authorizerdev: Authorizer
		nc: NatsConnection,
		player: Player
	}
}

interface ImportMetaEnv {
	VITE_CMS_URL: string;
	VITE_HOST_DOMAIN: string;
	VITE_APP_GRAPHQL_ENDPOINT: string;
	VITE_APP_GRAPHQL_ENDPOINT_WS: string;
	VITE_APP_HASURA_GRAPHQL_ADMIN_SECRET: string;
	VITE_STRIPE_PUBLIC_KEY: string;
}