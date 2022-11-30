<script lang="ts">
	export let toggle: any;
	export let details = false;
</script>

<button
	class="border-bottom-md"
	on:click={() => {
		toggle(details);
	}}
>
	{#if details}
		<slot /> - <i class="fa fa-eye-slash" /> <span class="ml-2 underline">Hide</span>
	{:else}
		<slot /> - <i class="fa fa-eye" /><span class="ml-2 underline">View</span>
	{/if}
</button>
