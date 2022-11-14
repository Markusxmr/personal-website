<script lang="ts">
	import Footer from '$lib/apps/cv/components/footer/footer.svelte';
	import Header from '$lib/core/components/header/header-primary.svelte';
	import 'svelte-material-ui/bare.css';
	import './app.scss';
</script>

<div class="relative">
	<Header />
	<div class="container mx-auto mt-5 h-full px-4">
		<slot />
	</div>

	<div class="mt-20 w-full">
		<Footer />
	</div>
</div>
