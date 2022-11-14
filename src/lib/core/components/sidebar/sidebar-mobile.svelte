<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { store } from '$lib/core/store';
	import SideBarFooter from './sidebar-footer.svelte';
	import AppName from './app-name.svelte';

	export let closeMobileOffCanvas: any;
	let screenDarken: HTMLElement | null;
	onMount(() => {
		screenDarken = browser ? document.querySelector('.screen-darken') : null;
	});

	$: if ($store.sidebar.showingOffCanvas === true) {
		if (screenDarken) screenDarken.classList.add('active');
	} else {
		if (screenDarken) screenDarken.classList.remove('active');
	}
</script>

<div
	class:show={$store.sidebar.showingOffCanvas}
	class="mobile-offcanvas navbar navbar-expand-lg navbar-dark bg-primary border-end bg-white"
	style="height: 100vh;"
>
	<div class="border-bottom bg-light sidebar-header p-2">
		<h3>&nbsp;&nbsp; <AppName /></h3>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i class="fa fa-close icon-close" on:click={closeMobileOffCanvas} />
	</div>

	<div class="list-group list-group-flush">
		{#each $store.sidebar.apps.menus[$store.meta.app] as menu}
			<a
				class:selected-sidebar-item={$store.sidebar.selectedMenuId === menu.id}
				class="list-group-item list-group-item-action list-group-item-light p-3"
				on:click={closeMobileOffCanvas}
				href={menu.url}
			>
				<i class={menu.icon} />&nbsp; {menu.name}</a
			>
		{/each}

		<SideBarFooter />
	</div>
</div>

<style global>
	.sidebar-header {
		display: grid;
		grid-template-columns: 1fr 30px;
		justify-content: end;
	}

	.icon-close {
		font-size: 1.5rem;
	}

	body.offcanvas-active {
		overflow: hidden;
	}

	.offcanvas-header {
		display: none;
	}

	.screen-darken {
		height: 100%;
		width: 0%;
		z-index: 30;
		position: fixed;
		top: 0;
		right: 0;
		opacity: 0;
		visibility: hidden;
		background-color: rgba(34, 34, 34, 0.6);
		transition: opacity 0.2s linear, visibility 0.2s, width 2s ease-in;
	}

	.screen-darken.active {
		z-index: 10;
		transition: opacity 0.3s ease, width 0s;
		opacity: 1;
		width: 100%;
		visibility: visible;
	}

	/* ============ mobile view ============ */
	@media all and (max-width: 991px) {
		.offcanvas-header {
			display: block;
		}

		.mobile-offcanvas {
			visibility: hidden;
			transform: translateX(-100%);
			border-radius: 0;
			display: block;
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 80%;
			z-index: 1200;
			overflow-y: scroll;
			overflow-x: hidden;
			transition: visibility 0.3s ease-in-out, transform 0.3s ease-in-out;
		}

		.mobile-offcanvas.show {
			visibility: visible;
			transform: translateX(0);
		}

		.mobile-offcanvas .container,
		.mobile-offcanvas .container-fluid {
			display: block;
		}
	}

	/* ============ mobile view .end// ============ */
</style>
