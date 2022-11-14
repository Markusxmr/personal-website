<script lang="ts">
	import About from '$lib/apps/cv/components/about.svelte';
	import { post } from '$lib/core/utils/http.utils';

	let contactInfo = {
		phone: '+385976300757',
		address: 'Croatia',
		email: 'marko.rendulic@gmail.com'
	};
	let contactFull = {
		name: 'Marko',
		email: 'marko.rendulic@gmail.com',
		message: 'Test message'
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

		const response = await post(`/apps/cv/about`, data);
	}
</script>

<section>
	<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">About</h1>
	<div
		class="mb-20 grid gap-4 sm:grid-cols-1 md:grid-cols-2"
		style="border-top: 1px solid #eee; border-bottom: 1px solid #eee;"
	>
		<div class="py-10">
			<About />
		</div>

		<form class="p-10" on:submit|preventDefault={handleSubmit} style="border-left: 1px solid #eee;">
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
						class="w-full rounded border border-gray-300 px-2 py-1 text-sm outline-none"
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
						class="w-full rounded border border-gray-300 px-2 py-1 text-sm outline-none"
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
						class="w-full rounded border border-gray-300 px-2 py-1 text-sm outline-none"
						style="height: 88px;"
						placeholder="Message"
						required
						bind:value={contact.message}
					/>
				</div>
			</div>
			<br />

			<div class="text-center">
				<button
					type="button"
					class="
					mx-auto
					mr-2
					mb-2
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
					dark:text-gray-400
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
</section>
