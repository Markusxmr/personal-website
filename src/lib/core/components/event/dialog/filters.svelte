<script lang="ts">
	import { goto } from '$app/navigation';
	import Dialog from '$lib/core/components/dialog/dialog.svelte';
	import EventsFilter from '../filters/events.svelte';
	import { getContext, onMount } from 'svelte';
	// const { close } = getContext('simple-modal');

	export let article: any = null;
	export let submit = () => {};

	function handleSubmit() {
		goto('/wallet');
		// close();
		submit();
	}
</script>

<Dialog>
	<EventsFilter />
</Dialog>
