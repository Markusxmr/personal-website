<script lang="ts">
	import { store } from '$stores/core';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	let pageNavigator: HTMLElement | null;
	let active = 0;

	onMount(() => {
		pageNavigator = document.getElementById('page-navigator');
		if (!pageNavigator) return;
	});

	let sections = [
		{
			title: 'Introduction'
		},
		{
			title: 'Stats'
		},
		{
			title: 'Recent projects'
		}
	];

	function scrollTo(num: number) {
		active = num;
		jQuery('html, body').animate({ scrollTop: jQuery(`#section-${num}`)?.offset()?.top - 100 }, 500);
	}
</script>

<div
	in:scale={{ duration: 650, start: 0.95 }}
	out:scale={{ duration: 275, start: 0.95 }}
	id="page-navigator"
	style="background: rgba(0,0,0,0.8)"
	class="grid h-auto w-auto grid-cols-3 rounded-md bg-gray-800 bg-white py-8 px-5 text-white shadow-lg"
>
	{#each sections as section, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span
			on:click={() => scrollTo(i)}
			class:border-red-500={active === i}
			class="border-3
        dark:border-dark-500
        mr-[4px]
        h-24
        cursor-pointer
        items-center
        justify-center
        border
        border-solid
        border-gray-600
        p-5
        shadow-md
        transition
        hover:border-red-500
        hover:opacity-100">{section?.title}</span
		>
	{/each}
</div>

<style>
	#page-navigator {
		position: fixed;
		display: block;
		z-index: 90;
		bottom: 5px;
		left: 5px;
	}
</style>
