<script lang="ts">
	import Plan from '$lib/apps/music-code/components/plans.svelte';
	let plans = [];
</script>

{#each plans as plan}
	<Plan {plan} />
{/each}
