<script lang="ts">
	import { App } from '$lib/core/enums';
	import { store } from '$stores/core';
</script>

<div class="mx-auto text-center" style="margin-top: 10px;">
	{#if $store.meta.app === App.ADMIN}
		Admin
	{:else if $store.meta.app === App.CV}
		CV
	{:else if $store.meta.app === App.MUSIC_CODE}
		MC
	{:else if $store.meta.app === App.WINE_CODE}
		WC
	{:else}
		{$store.meta.appName}
	{/if}
</div>
