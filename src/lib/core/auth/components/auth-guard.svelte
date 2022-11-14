<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { store } from '$lib/core/store';

	onMount(async () => {
		if (!browser) return;
		if ($store.isAuthenticated === false) {
			goto(`/${$store.meta.baseUri}`);
		}
	});
</script>

{#if $store.isAuthenticated === true}
	<slot />
{/if}
