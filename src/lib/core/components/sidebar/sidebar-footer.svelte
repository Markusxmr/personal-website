<script lang="ts">
	import { App } from '$lib/core/enums';
	import { store } from '$lib/core/store';
	import { closeSidebarHandler } from '$lib/core/utils/sidebar.utils';
</script>

<div class="sidebar-footer mt-2">
	{#if $store.meta.app === App.MUSIC_CODE}
		{#if $store.isAuthenticated}
			<a
				href="/apps/music-code/add-music"
				class="btn btn-block btn-primary btn-air btn-bold"
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
