<script lang="ts">
	import { store } from '$stores/core';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { App } from '../enums';

	let showBackToTopButton = false;
	let backToTopButton: HTMLElement | null;
	let musicCodeMainContent: HTMLElement | null;

	function scrollFunction() {
		showBackToTopButton = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? true : false;
	}

	function scrollFunctionMC() {
		if (musicCodeMainContent) {
			showBackToTopButton = musicCodeMainContent.scrollTop > 20 ? true : false;
		}
	}

	function backToTop() {
		jQuery('html, body').animate({ scrollTop: 0 }, 500);
		backToTopMusicCode();
		window.scrollTo(0, 0);
	}

	function backToTopMusicCode() {
		musicCodeMainContent ? jQuery(musicCodeMainContent).animate({ scrollTop: 0 }, 500) : null;
	}

	onMount(() => {
		musicCodeMainContent = document.getElementsByClassName('main-content')?.[0] as HTMLElement | null;
		window.onscroll = () => scrollFunction();
		musicCodeMainContent ? (musicCodeMainContent.onscroll = () => scrollFunctionMC()) : null;
	});
</script>

{#if showBackToTopButton}
	<button
		in:scale={{ duration: 350, start: 0.95 }}
		out:scale={{ duration: 150, start: 0.95 }}
		bind:this={backToTopButton}
		type="button"
		data-mdb-ripple="true"
		data-mdb-ripple-color="light"
		on:click={backToTop}
		class="btn
		btn-danger
		rounded-circle
		bottom-5
		right-5
		inline-block
		rounded-full
		bg-red-600
		p-3
		text-xs
		font-medium
		uppercase
		leading-tight
		text-white
		shadow-md
		transition
		duration-150
		ease-in-out
		hover:bg-red-700
		hover:shadow-lg
		focus:bg-red-700
		focus:shadow-lg
		focus:outline-none
		focus:ring-0
		active:bg-red-800
		active:shadow-lg"
		id="btn-back-to-top"
	>
		{#if $store.meta?.app === App.ART_CODE || $store.meta?.app === App.MUSIC_CODE}
			<i class="fa fa-arrow-up up-arrow-artcode" aria-hidden="false" />
		{:else}
			<svg
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				class="up-arrow h-4 w-4"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 448 512"
			>
				<path
					fill="#fff"
					d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
				/>
			</svg>
		{/if}
	</button>
{/if}

<style>
	#btn-back-to-top {
		position: fixed;
		display: block;
		z-index: 100;
		bottom: 30px;
		right: 15px;
		height: 40px;
		width: 40px;
	}

	.up-arrow {
		height: 15px;
		width: 16px;
	}

	.up-arrow-artcode {
		position: absolute;
		font-size: 1.1rem;
		right: 11px;
		bottom: 9px;
	}
</style>
