<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { cvStore } from '$stores/cv.store';
	import '@splidejs/splide/dist/css/themes/splide-default.min.css';

	$: item = $cvStore.dialog;
	let x;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" />
</svelte:head>

<div bind:clientWidth={x}>
	<Splide options={{ width: '100%', rewind: false, perPage: x > 600 ? 3 : 1, autoplay: true }} aria-label="Images">
		{#each item?.images ?? [] as image}
			<SplideSlide>
				<img src={image} class="lazy featured-item-img w-full" alt={item?.title} />
			</SplideSlide>
		{/each}
	</Splide>
</div>

<style>
	:global(li.splide__slide) {
		width: calc(100%) !important;
	}
	.featured-item-img {
		object-fit: cover;
		background-color: #fff;
	}
	@media screen and (max-width: 600px) {
		.featured-item-img {
			object-fit: cover;
			background-color: #fff;
		}
	}
</style>
