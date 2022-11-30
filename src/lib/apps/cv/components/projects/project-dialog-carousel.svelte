<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { cvStore } from '$stores/cv.store';
	import { HREF_VOID } from '$lib/apps/art-code/constants';
	import '@splidejs/splide/dist/css/themes/splide-default.min.css';

	$: item = $cvStore.dialog;
	let x;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" />
</svelte:head>

<div bind:clientWidth={x}>
	<Splide options={{ rewind: false, perPage: x > 600 ? 3 : 1, autoplay: true }} aria-label="Images">
		{#each item?.images ?? [] as image}
			<SplideSlide>
				<img src={image} class="lazy img-fluid featured-item-img" alt="" />
			</SplideSlide>
		{/each}
	</Splide>
</div>

<style>
	.featured-item-img {
		object-fit: cover;
		background-color: #fff;
	}
	@media screen and (max-width: 600px) {
		.featured-item-img {
			height: 300px;
			width: 100%;
			object-fit: cover;
			background-color: #fff;
		}
	}
</style>
