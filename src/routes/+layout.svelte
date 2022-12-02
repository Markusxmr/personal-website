<script lang="ts">
	import { connect, StringCodec } from 'nats.ws';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';
	import Notifications from 'svelte-notifications';
	import Modal from 'svelte-simple-modal';
	import Auth from '$lib/core/auth/components/auth.svelte';
	import { store } from '$stores/core';
	import GlobalSubscription from '$lib/core/components/global-subscription.svelte';
	import Logger from '$lib/core/components/logger.svelte';
	import { getAppCtxByUrl, setApplication, app } from '$lib/core/utils/app-context.utils';
	import 'svelte-material-ui/bare.css';
	import { App } from '$lib/core/enums';
	import { initNatsClient } from '$lib/core/clients/nats';
	import { getLocalAuth } from '$lib/core/utils/auth.utils';
	import PreloadingIndicator from '$lib/core/components/preloading-indicator.svelte';
	import StripeProvider from '$lib/stripe/stripe-provider.svelte';
	import ScrollTopButton from '$lib/core/components/scroll-top-button.svelte';
	import Whatsapp from '$lib/core/components/whatsapp.svelte';
	import Membership from '$lib/core/components/membership.svelte';

	let nc: any;
	let outerWidth = 0;
	let modalStyleLight = {
		borderTop: 'solid 1px rgba(255, 255, 255, 0.1)',
		boxShadow: '0px 0px 8px 0px rgb(0 0 0 / 100%)',
		borderRadius: '8px'
	};
	let modalStyleDark = {
		...modalStyleLight,
		backgroundColor: '#212428'
	};
	let modalStyleWindow = modalStyleLight;

	$: if (browser && outerWidth <= 650) {
		closeMobileOffCanvas();
	}

	function closeMobileOffCanvas() {
		store.update((state) => {
			state.sidebar.showingOffCanvas = false;
			return state;
		});
	}

	function modalStyleFn(app: any) {
		if (browser && app === App.ART_CODE) {
			modalStyleWindow = modalStyleDark;
		} else {
			modalStyleWindow = modalStyleLight;
		}
	}

	$: modalStyleFn($store.meta.app);

	$: if (browser && $store.meta.app === App.ART_CODE) {
		modalStyleWindow = modalStyleDark;
	} else {
		modalStyleWindow = modalStyleLight;
	}

	onMount(async () => {
		getLocalAuth();

		const href = window.location.href;

		if (!href.includes(`/apps/`)) {
			if (href.includes(`artcode.city`)) {
				setApplication(App.ART_CODE);
				goto(`/apps/art-code`);
			} else if (href.includes(`musiccode.city`)) {
				setApplication(App.MUSIC_CODE);
				goto(`/apps/music-code`);
			} else if (href.includes(`markorendulic.com`)) {
				setApplication(App.CV);
				goto(`/apps/cv`);
			} else if (href.includes(`winecode.city`)) {
				setApplication(App.WINE_CODE);
				goto(`/apps/wine-code`);
			} else {
				const envApp: App = import.meta.env.VITE_APPLICATION;
				setApplication(envApp);
				goto(`/apps/${app(envApp)}`);
			}
		} else {
			const appCtx = getAppCtxByUrl();
			setApplication(appCtx);
		}

		await initNatsClient().then((conn) => {
			const nc = conn;
			// create a codec
			const sc = StringCodec();
			// create a simple subscriber and iterate over messages
			// matching the subscription
			const sub = nc.subscribe('email.>');
			async () => {
				for await (const m of sub) {
					const decoded = sc.decode(m.data);
					console.log(decoded);
					// console.log(`[${sub.getProcessed()}]: ${decoded}`);
					store.update((state) => ({ ...state, notification: { text: 'Your message is sent', type: 'success' } }));
					console.log('subscription closed');
				}
			};
		});
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />

	<script src="/core/js/jquery.min.js"></script>
</svelte:head>

<svelte:window bind:outerWidth />

{#if $navigating}
	<PreloadingIndicator />
{/if}

<ScrollTopButton />
<Whatsapp />

<a id="top" />

<span class="screen-darken" on:click={closeMobileOffCanvas} />

<Auth>
	<Membership>
		<Notifications>
			{#if nc}
				<GlobalSubscription {nc} />
			{/if}
			<Logger />
			<Modal styleWindow={modalStyleWindow}>
				<StripeProvider>
					<slot />
				</StripeProvider>
			</Modal>
		</Notifications>
	</Membership>
</Auth>

<style>
	:global(.mdc-select__anchor) {
		margin-top: 10px;
		height: 40px !important;
	}
	:global(.smui-badge) {
		border-radius: 100px !important;
		width: 25px;
	}
</style>
