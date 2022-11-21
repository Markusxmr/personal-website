<script lang="ts">
	import { customTransition } from '$lib/core/animations';
	import Diagrams from './components/diagrams.svelte';
</script>

<div transition:customTransition>
	<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">Diagrams</h1>

	<Diagrams />
</div>
