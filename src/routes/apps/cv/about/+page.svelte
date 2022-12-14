<script lang="ts">
	import { scale } from 'svelte/transition';
	import { connect, StringCodec } from 'nats.ws';
	import About from '$lib/apps/cv/components/about.svelte';
	import { post } from '$lib/core/utils/http.utils';
	import { getNotificationsContext } from 'svelte-notifications';
	import { perks } from '../home.data';

	const { addNotification } = getNotificationsContext();

	let contactInfo = {
		phone: '+385976300757',
		address: 'Croatia',
		email: 'marko.rendulic@gmail.com'
	};
	let contact = {
		name: '',
		email: '',
		message: ''
	};

	async function handleSubmit(event: any) {
		event.preventDefault();
		const data = {
			to: contactInfo.email,
			from: contact.email,
			subject: contact.name,
			content: contact.message
		};
		sendEmailViaNats(data);

		contact = {
			name: '',
			email: '',
			message: ''
		};

		async function sendEmailViaRest(data) {
			await post(`/apps/cv/about`, data).then((res) => {
				addNotification({
					text: 'Your message is sent',
					type: 'success',
					position: 'top-center',
					removeAfter: 5000
				});
			});
		}

		async function sendEmailViaNats(data) {
			const nc = await connect({
				servers: [`${import.meta.env.VITE_NATS_WEBSOCKET}:9222`]
			});
			// create a codec
			const sc = StringCodec();
			nc.request('email.cv', sc.encode(JSON.stringify(data))).then((response) => {
				const result = sc.decode(response?.data);
				addNotification({
					text: result,
					type: 'success',
					position: 'top-center',
					removeAfter: 5000
				});
			});

			// we want to insure that messages that are in flight
			// get processed, so we are going to drain the
			// connection. Drain is the same as close, but makes
			// sure that all messages in flight get seen
			// by the iterator. After calling drain on the connection
			// the connection closes.
			await nc.drain();
		}
	}
</script>

<section in:scale={{ duration: 650, start: 0.95 }} out:scale={{ duration: 275, start: 0.95 }}>
	<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">About</h1>

	<div class="grid gap-4 shadow-sm drop-shadow-md sm:grid-cols-1 md:grid-cols-2 md:px-10">
		<div class="py-10">
			<About />
		</div>

		<form class="sm:p-2 md:p-10" on:submit|preventDefault={handleSubmit} style="border-left: 1px solid #eee;">
			<div class="mx-auto text-center">
				<div class="mb-3 text-gray-500">
					<h5>Get in Touch</h5>
				</div>

				<div class="grid sm:grid-cols-1 md:grid-cols-2">
					<div class="mb-3">
						<div class="ci-icon text-gray-600">
							<i class="fa fa-phone" aria-hidden="true" /> Phone
						</div>
						<div class="text-gray-600">
							<a href="tel:{contactInfo.phone}">{contactInfo.phone}</a>
						</div>
					</div>

					<div class="mb-3">
						<div class="ci-title font-alt text-gray-600">
							<i class="fa fa-envelope" aria-hidden="true" /> Email
						</div>
						<div class="text-gray-600">
							<a href="mailto:{contactInfo.email}">{contactInfo.email}</a>
						</div>
					</div>
				</div>
			</div>
			<div>
				<br />
				<div class="form-group">
					<input
						type="text"
						name="name"
						id="name"
						class="h-10 w-full rounded border border-gray-200 px-2 py-1 text-sm outline-none"
						placeholder="Name"
						aria-required="true"
						required
						bind:value={contact.name}
					/>
				</div>

				<div class="form-group">
					<input
						type="email"
						name="email"
						id="email"
						class="h-10 w-full rounded border border-gray-200 px-2 py-1 text-sm outline-none"
						placeholder="Email"
						aria-required="true"
						required
						bind:value={contact.email}
					/>
				</div>
			</div>

			<div>
				<div class="form-group">
					<textarea
						name="message"
						id="message"
						class="h-24 w-full rounded border border-gray-200 px-2 py-1 text-sm outline-none"
						placeholder="Message"
						required
						bind:value={contact.message}
					/>
				</div>
			</div>
			<br />

			<div class="text-center">
				<button
					type="submit"
					class="
					mx-auto
					mr-2
					rounded-lg
					border
					border-gray-200
					bg-white
					py-2.5
					px-5
					text-sm
					font-medium
					text-white
					hover:bg-gray-100
					hover:text-blue-700
					focus:z-10
					focus:outline-none
					focus:ring-4
					focus:ring-gray-200
					dark:border-gray-600
					dark:bg-gray-800
					dark:text-gray-200
					dark:hover:bg-gray-700
					dark:hover:text-white
					dark:focus:ring-gray-700"
					id="submit_btn"
					aria-controls="result"
					>Submit
				</button>
			</div>

			<div id="result" role="region" aria-live="polite" aria-atomic="true" />
		</form>
	</div>
	<div class="p-6">
		<div class="mb-5 border-b-2 border-gray-200">
			<h1>Miscellaneous</h1>
		</div>
		<div class="mb-10 grid gap-3 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6">
			{#each perks as perk}
				<div class="flip-card">
					<h6 class="mt-5 bg-white font-bold text-gray-700">{perk.title}</h6>
					<div class="flip-card-inner">
						<div class="flip-card-front">
							<img class="img-perk" src={perk.img} alt="" />
						</div>
						<div class="flip-card-back bg-gray-700">
							<p class="mt-5">{perk.subTitle}</p>
							<p>{perk.description}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.img-perk {
		border-radius: 3px;
		width: 100%;
		height: 185px;
		object-position: center;
		object-fit: cover;
	}

	/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
	.flip-card {
		background-color: transparent;
		width: 100%;
		min-height: 185px;
		perspective: 1000px;
		/* Remove this if you don't want the 3D effect */
		cursor: pointer;
	}

	/* This container is needed to position the front and back side */
	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}
	.flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden;
		/* Safari */
		backface-visibility: hidden;
	}

	/* Style the front side (fallback if image is missing) */
	.flip-card-front {
		background-color: #bbb;
		color: black;
	}
	.flip-card-back {
		background-color: dodgerblue;
		border-radius: 3px;
		color: white;
		transform: rotateY(180deg);
		height: 185px;
	}
</style>
