<script lang="ts">
	import AuthGuard from '$lib/core/auth/components/auth-guard.svelte';
</script>

<AuthGuard>
	<slot />
</AuthGuard>
