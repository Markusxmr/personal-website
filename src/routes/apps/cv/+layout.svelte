<script lang="ts">
	import { cvStore } from '$stores/cv.store';
	import Footer from '$lib/apps/cv/components/footer/footer.svelte';
	import Header from '$lib/core/components/header/header-primary.svelte';
	import 'svelte-material-ui/bare.css';
	import './app.scss';

	let meta = $cvStore?.meta;
</script>

<div class="relative">
	<Header {meta} />
	<div class="container mx-auto mt-5 h-full px-4">
		<slot />
	</div>

	<div class="mt-20 w-full">
		<Footer />
	</div>
</div>
