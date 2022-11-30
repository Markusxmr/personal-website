<script lang="ts">
	import Projects from '$lib/apps/cv/components/projects/projects.svelte';
	import { customTransition } from '$lib/core/animations';
</script>

<section transition:customTransition>
	<h1 class="border-b-2 border-indigo-500 text-2xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">
		My Recent Projects
	</h1>
	<!-- background -->
	<Projects />
</section>
