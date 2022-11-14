<script lang="ts">
	import ConfirmEmail from '$lib/core/auth/components/confirm-email.svelte';

	export let data: any;
	let { access_token } = data;
</script>

<ConfirmEmail {access_token} />
