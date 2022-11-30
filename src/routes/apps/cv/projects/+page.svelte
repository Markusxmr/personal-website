<script lang="ts">
	import { scale } from 'svelte/transition';
	import Projects from '$lib/apps/cv/components/projects/projects.svelte';
</script>

<section in:scale={{ duration: 650, start: 0.95 }} out:scale={{ duration: 275, start: 0.95 }}>
	<h1 class="border-b-2 border-indigo-500 text-2xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">
		My Recent Projects
	</h1>
	<!-- background -->
	<Projects />
</section>
