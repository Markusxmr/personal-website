<script lang="ts">
	import { store } from '$stores/core';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	let pageNavigator: HTMLElement | null;
	let activeSection = 0;
	let scrollY = 0;

	onMount(() => {
		pageNavigator = document.getElementById('page-navigator');
		if (!pageNavigator) return;
	});

	let sections = [
		{
			id: 0,
			title: 'Introduction'
		},
		{
			id: 1,
			title: 'Stats'
		},
		{
			id: 2,
			title: 'Recent projects'
		}
	];

	function scrollYMonitor() {
		let section1 = Math.round(jQuery(`#section-${0}`)?.offset()?.top - 100);
		let section2 = Math.round(jQuery(`#section-${1}`)?.offset()?.top - 100);
		let section3 = Math.round(jQuery(`#section-${2}`)?.offset()?.top - 100);

		if (scrollY >= section3) activeSection = 2;
		else if (scrollY >= section2) activeSection = 1;
		else activeSection = 0;
	}

	$: if (scrollY) {
		scrollYMonitor();
	}

	function scrollTo(num: number) {
		activeSection = num;
		jQuery('html, body').animate({ scrollTop: jQuery(`#section-${num}`)?.offset()?.top - 100 }, 500);
	}
</script>

<svelte:window bind:scrollY />

<div
	in:scale={{ duration: 650, start: 0.95 }}
	out:scale={{ duration: 275, start: 0.95 }}
	id="page-navigator"
	style="background: rgba(0,0,0,0.75)"
	class="grid-cols-auto grid h-auto w-auto rounded-md bg-gray-800 bg-white py-7 px-4 text-white shadow-lg"
>
	{#each sections as section, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span
			on:click={() => scrollTo(section?.id)}
			class:border-red-500={activeSection === i}
			class:border-gray-500={activeSection !== i}
			class="dark:border-dark-600
        mr-[4px]
        h-24
		cursor-pointer
        items-center
        justify-center
        rounded-md
        border-4
        border
        p-3
        font-semibold
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
