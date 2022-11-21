<script lang="ts">
	import { App } from '$lib/core/enums';
	import { store } from '$stores/core';
	import { closeSidebarHandler } from '$lib/core/utils/sidebar.utils';
</script>

<div class="sidebar-footer mx-2 mt-2">
	{#if $store.meta.app === App.MUSIC_CODE}
		{#if $store.isAuthenticated}
			<a
				href="/apps/music-code/artists/new"
				class="btn btn-sm btn-block btn-primary btn-air btn-bold mb-2"
				on:click={() => {
					if (outerWidth <= 650) closeSidebarHandler();
				}}
			>
				<div><span class="mr-2">Artist</span><i class="fa fa-plus" /></div>
			</a>
			<a
				href="/apps/music-code/albums/new"
				class="btn btn-sm btn-block btn-primary btn-air btn-bold mb-2"
				on:click={() => {
					if (outerWidth <= 650) closeSidebarHandler();
				}}
			>
				<div><span class="mr-2">Album</span><i class="fa fa-plus" /></div>
			</a>
			<a
				href="/apps/music-code/tracks/new"
				class="btn btn-sm btn-block btn-primary btn-air btn-bold mb-2"
				on:click={() => {
					if (outerWidth <= 650) closeSidebarHandler();
				}}
			>
				<div><span class="mr-2">Music</span><i class="fa fa-plus" /></div>
			</a>
		{/if}
	{/if}
</div>

<style>
	.sidebar-footer {
		border: none !important;
		margin: 3px 3px 0px 3px;
	}
</style>
