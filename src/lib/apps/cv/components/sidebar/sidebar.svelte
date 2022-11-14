<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { store } from '$lib/core/store';
	import { closeSidebarHandler, sideBarToggle } from '$lib/core/utils/sidebar.utils';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getAppCtxByUrl } from '$lib/core/utils/app-context.utils';

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

<aside class="w-36" aria-label="Sidebar">
	<div class="overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800" style="height: 100vh">
		<ul class="space-y-2">
			{#each menus as menu}
				<li>
					<a
						href={menu.url}
						class="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
					>
						<!-- <svg
							class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
							<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
						</svg> -->
						<span class="ml-3">{menu.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</aside>
