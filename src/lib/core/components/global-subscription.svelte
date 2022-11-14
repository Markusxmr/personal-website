<script lang="ts">
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { StringCodec, type Subscription } from 'nats.ws';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	let globalSubscription: Subscription;
	export let nc: any;

	onMount(async () => {
		const sc = StringCodec();
		globalSubscription = nc.subscribe('patriarch.global');

		(async () => {
			for await (const m of globalSubscription) {
				let decodedData = sc.decode(m.data);
				let data = JSON.parse(decodedData);

				addNotification({
					text: JSON.stringify(data, null, 2),
					type: 'warning',
					position: 'top-center',
					removeAfter: 5000
				});
			}
			console.log('subscription closed');
		})();
	});

	onDestroy(() => {
		globalSubscription?.unsubscribe();
	});
</script>
