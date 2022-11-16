<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { store } from '$stores/core';
	import { closeSidebarHandler, sideBarToggle } from '$lib/core/utils/sidebar.utils';
	import { onMount } from 'svelte';
	import SideBarFooter from './sidebar-footer.svelte';
	import { page } from '$app/stores';
	import { getAppCtxByUrl } from '$lib/core/utils/app-context.utils';
	import AppName from './app-name.svelte';

	export let outerWidth = 0;
	$: BASE_URI = $store.meta.baseUri;
	$: menus = $store.sidebar.apps.menus[$store.meta.app];

	function selectMenu(menu: any) {
		store.update((state) => ({
			...state,
			meta: {
				...state.meta,
				app: getAppCtxByUrl()
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
		if (outerWidth > 650) sideBarToggle('#sidebarToggle');
		const menu = menus.find((menu: any) => {
			const id = `/${menu?.id}`;
			const detailPageRouteId = `/${menu?.detailPage?.id}`;
			return $page?.route?.id === id || $page?.route?.id === detailPageRouteId;
		});
		selectMenu(menu);
	});
</script>

<div class="border-end" id="sidebar" style="height: 100vh;">
	<div class="sidebar-heading border-bottom text-center">
		<a href={`/${BASE_URI}`} style="color: inherit; text-decoration: inherit;">
			<AppName />
		</a>
	</div>

	<div class="list-group">
		{#each menus as menu}
			<a
				class:active-sidebar-item={$store.sidebar.selectedMenu === menu || $page?.route?.id === menu.detailPage.id}
				class="list-group-item p-3"
				on:click={() => {
					if (outerWidth <= 650) closeSidebarHandler();
				}}
				href={menu.url}
			>
				<i class={menu.icon} />
				<br />
				&nbsp; {menu.name}
			</a>
		{/each}

		<SideBarFooter />
	</div>
</div>

<style>
	.fa {
		font-size: 1.1rem;
	}
	.sidebar-heading {
		height: 75px;
	}

	.list-group {
		text-align: center;
		border: none;
		font-size: 0.9rem;
	}

	.fa {
		color: #555;
	}

	.list-group-item {
		color: #888;
	}

	.active-sidebar-item {
		background-color: #ddd;
		color: #333;
		font-weight: 400;
		border-right: 3px solid #333;
	}
</style>
