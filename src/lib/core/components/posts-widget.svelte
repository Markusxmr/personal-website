<script lang="ts">
	import { StringCodec, type Subscription } from 'nats.ws';
	import Paper from '@smui/paper';
	import List, { Meta, Text, PrimaryText, SecondaryText } from '@smui/list';
	import { Image } from '@smui/image-list';
	import { faker } from '@faker-js/faker';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';

	let postsSubscription: Subscription;

	onMount(async () => {
		if (window?.nc) {
			const postsSubscription = window?.nc.subscribe('posts');

			const sc = StringCodec();
			(async () => {
				for await (const m of postsSubscription) {
					let decodedData = sc.decode(m.data);
					let data = JSON.parse(decodedData);
					options.push(data);
					options = options;
				}
				console.log('subscription closed');
			})();
		}
	});

	onDestroy(() => {
		postsSubscription?.unsubscribe();
	});

	let options = [
		{
			name: 'Bruce Willis',
			description: 'Actor',
			content: faker.lorem.paragraphs(),
			disabled: false
		},
		{
			name: 'Austin Powers',
			description: 'Fictional Character',
			content: faker.lorem.paragraphs(),
			disabled: false
		},
		{
			name: 'Thomas Edison',
			description: 'Inventor',
			content: faker.lorem.paragraphs(),
			disabled: false
		},
		{
			name: 'Stephen Hawking',
			description: 'Scientist',
			content: faker.lorem.paragraphs(),
			disabled: false
		}
	];
	let selection = 'Stephen Hawking';
	// This value is updated when the component is initialized, based on the
	// selected Item's `selected` prop.
	let selectionIndex: number | undefined = undefined;
</script>

<Paper elevation={0.5}>
	<List twoLine avatarList singleSelection bind:selectedIndex={selectionIndex}>
		{#each options as item, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click={() => (selection = item.name)}
				disabled={item.disabled}
				selected={selection === item.name}
				class="post"
			>
				<Text class="">
					<PrimaryText>{item.name}</PrimaryText>
					<SecondaryText>{item.description}</SecondaryText>
					<span style="font-size: 0.9rem; margin-top: 15px !important">
						{item.content}
					</span>
				</Text>
				<Meta class="material-icons pt-3">info</Meta>
			</div>
		{/each}
	</List>
</Paper>

<style global>
	.post {
		display: grid;
		grid-template-columns: 1fr 50px;
		cursor: pointer;
		height: 100%;
		padding: 0px 10px 10px 10px;
		border-radius: 3px;
	}

	.post:hover {
		background-color: #eee;
	}
</style>
