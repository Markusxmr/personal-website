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
		Hide
	{:else}
		More
	{/if}
</button>
