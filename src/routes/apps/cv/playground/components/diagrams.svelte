<script lang="ts">
	import { onMount } from 'svelte';
	import Svelvet from 'svelvet';
	import Select, { Option } from '@smui/select';
	import Icon from '@smui/select/icon';
	import { portfolio } from './index';

	let value = 'Example';
	let valueHelperText = '';
	let valueLeadingIcon = '';
	let valueInvalid = '';

	onMount(() => {
		setTimeout(() => {
			console.log(portfolio[0]);
		}, 2000);
	});
</script>

<div class="text-center align-middle" style="margin-top: 70px">
	<Select variant="outlined" bind:value label="Portfolio">
		{#each portfolio as project}
			<Option value={project.type}>{project.type}</Option>
		{/each}
	</Select>
</div>
<div class="ma">
	{#each portfolio as diagram}
		{#if value === diagram.type}
			<div class="mx-auto text-center align-middle">
				<Svelvet width={1500} nodes={diagram.initialNodes} edges={diagram.initialEdges} background />
			</div>
		{/if}
	{/each}
</div>

<style>
	.ma {
		overflow: hidden;
	}
</style>
