<script lang="ts">
	import { store } from '$lib/core/store';
	import { closeSidebarHandler } from '$lib/core/utils/sidebar.utils';

	export let outerWidth = 0;

	function handleSelectMenu(menu: any) {
		store.update((state) => ({ ...state, sidebar: { ...state.sidebar, selectedMenuId: menu.id } }));
	}
</script>

<slot {closeSidebarHandler} />
