<script lang="ts">
	import { getProfile } from '$lib/core/auth/authorizer';
	import { getStrapiCMSMembership } from '$lib/core/services/membership-strapi.service';
	import { findMembership } from '$lib/core/services/membership.service';
	import { store } from '$stores/core';
	import { onMount, setContext } from 'svelte';

	const key = 'membership';
	let user: any;
	let membership: any;

	setContext(key, {
		getMembership: () => null
	});

	onMount(async () => {
		try {
			user = await getProfile();
			membership = await findMembership({
				variables: {
					authorizer_id: user?.id,
					platform: $store?.meta?.app
				}
			});
			store.update((state) => ({ ...state, profile: { ...state.profile, membership } }));
		} catch (error) {
			console.log(error);
		}
	});
</script>

<slot />
