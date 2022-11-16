<script lang="ts">
	import { browser } from '$app/environment';
	import { store } from '$stores/core';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	store.subscribe((state) => {
		if (browser && state.notification) {
			addNotification({
				text: state.notification.text,
				type: state.notification.type,
				position: 'top-center',
				removeAfter: 3000
			});
		}
	});
</script>
