<script lang="ts">
	import { StringCodec } from 'nats.ws';
	import { scale } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	import { store } from '$stores/core';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getAppCtxByUrl } from '$lib/core/utils/app-context.utils';
	import HeaderApplicationSelection from './header-app-selection.svelte';
	import { App } from '$lib/core/enums';
	import HeaderAccount from './header-account.svelte';

	export let meta = {
		brandImage: '/cv/user/Marko.jpeg',
		siteName: 'Marko Rendulić',
		siteUrl: 'https://markorendulic.com/apps/cv'
	};
	export let brandImage = '/cv/user/Marko.jpeg';
	export let siteName = 'Marko Rendulić';
	export let siteUrl = 'https://markorendulic.com/';
	let show = false; // menu state
	let menu: HTMLElement; // menu wrapper DOM reference
	$: menus = $store.sidebar.apps.menus[$store.meta.app];

	function selectMenu(menu: any) {
		store.update((state) => ({
			...state,
			meta: {
				...state.meta,
				app: getAppCtxByUrl() as any
			},
			sidebar: {
				...state.sidebar,
				selectedMenu: menu
			}
		}));
	}

	beforeNavigate(({ from, to }) => {
		const menu = menus.find((menu: any) => {
			const id = `/${menu?.id}`;
			const detailPageRouteId = `/${menu?.detailPage?.id}`;
			return to?.route?.id === id || to?.route?.id === detailPageRouteId;
		});

		selectMenu(menu);
	});

	onMount(async () => {
		const menu = menus.find((menu: any) => {
			const id = `/${menu?.id}`;
			const detailPageRouteId = `/${menu?.detailPage?.id}`;
			return $page?.route?.id === id || $page?.route?.id === detailPageRouteId;
		});
		selectMenu(menu);

		const handleOutsideClick = (event: { target: any }) => {
			if (show && !menu?.contains(event?.target)) {
				show = false;
			}
		};

		const handleEscape = (event: { key: string }) => {
			if (show && event?.key === 'Escape') {
				show = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});

	function active(menu: any) {
		return $store.sidebar.selectedMenu === menu || $page?.route?.id === menu.detailPage.id;
	}
</script>

<nav class="sticky top-0 z-10 bg-white px-2 py-2.5 sm:px-4">
	<div class="container mx-auto flex flex-wrap items-center justify-between">
		<a href={meta?.siteUrl} class="flex items-center">
			<img src={meta?.brandImage} class="mr-3 h-6 rounded-full sm:h-9" alt={meta?.siteName} />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-gray-900">{meta?.siteName}</span>
		</a>
		<button
			data-collapse-toggle="navbar-default"
			type="button"
			class="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
			aria-controls="navbar-default"
			aria-expanded="false"
		>
			<span class="sr-only">Open main menu</span>
			<svg
				class="h-6 w-6"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				on:click={() => (show = !show)}
				><path
					fill-rule="evenodd"
					d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
					clip-rule="evenodd"
				/></svg
			>
		</button>
		<div
			class="{show ? '' : 'hidden'} w-full md:block md:w-auto"
			id="navbar-default"
			bind:this={menu}
			in:scale={{ duration: 100, start: 0.95 }}
			out:scale={{ duration: 75, start: 0.95 }}
		>
			<ul
				class="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 dark:border-gray-700 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium"
			>
				{#each menus as menu}
					<li class="nav-item">
						<a
							on:click={() => {
								show = false;
							}}
							href={menu.url}
							class={active(menu)
								? 'block font-bold rounded bg-gray-100 py-2 pr-4 pl-3 text-gray-900 dark:text-gray-900 md:bg-transparent md:p-0 md:text-blue-700'
								: 'block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-800 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover: dark:text-gray-800'}
							aria-current={active(menu) ? 'page' : 'false'}>{menu.name}</a
						>
					</li>
				{/each}

				{#if $store.meta.app !== App.CV}
					<li class="nav-item">
						<HeaderAccount />
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
