<script lang="ts">
	import { goto } from '$app/navigation';
	import Dialog from '$lib/core/components/dialog/dialog.svelte';
	import { CMS_URL } from '$lib/core/config';
	import { getContext, onMount } from 'svelte';
	// const { close } = getContext('simple-modal');

	export let event: any = null;
	export let submit = () => {};

	function handleSubmit() {
		goto('/wallet');
		// close();
		submit();
	}
</script>

<Dialog>
	<div class="modal-body">
		<div class="form-border p-3">
			<div class="mb-3">
				<img src={`${event.featuredImage.formats.medium.url}`} />
			</div>
			<h3>{event.name}</h3>
			{@html event.description}
		</div>
	</div>
</Dialog>
