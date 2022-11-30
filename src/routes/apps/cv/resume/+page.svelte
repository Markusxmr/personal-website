<script lang="ts">
	import { scale } from 'svelte/transition';
</script>

<div in:scale={{ duration: 650, start: 0.95 }} out:scale={{ duration: 275, start: 0.95 }}>
	<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">Resume</h1>
	<div>
		<div class="mt-3 mb-4">
			<a href="/cv/CV_Marko_Rendulić.pdf" download> <strong>Download Resume</strong> </a>
		</div>
		<embed src="/cv/CV_Marko_Rendulić.pdf" height="750px" width="100%" />
	</div>
</div>
