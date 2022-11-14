<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { store } from '$lib/core/store';
	import { getProfile } from '$lib/core/auth/authorizer';

	export let access_token: any = '';

	onMount(async () => {
		if (access_token) {
			localStorage.setItem('access_token', access_token);
			setTimeout(async () => {
				await getProfile(access_token);
				goto(`/${$store.meta.baseUri}`);
			}, 3000);
		}
	});
</script>

<div class="page-content">
	{#if access_token}
		<h3 class="mt-5 text-center orange">Email Successfully Confirmed</h3>
	{:else}
		<h3 class="mt-5 text-center orange">Verification email was sent. Please check you email</h3>
	{/if}
</div>
