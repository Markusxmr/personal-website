<script lang="ts">
	import { signup } from '$lib/core/auth/authorizer';
	import { store } from '$stores/core';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Authorizer } from '$lib/core/auth/authorizer.lib';
	import { authorizer } from '$lib/core/auth/authorizer';

	let authorizerRef: Authorizer;
	let message = '';

	let user = {
		email: '',
		password: '',
		confirm_password: '',
		given_name: '',
		family_name: '',
		picture: '',
		roles: ['user'],
		middle_name: '',
		nickname: '',
		gender: '',
		birthdate: '',
		// phone_number: '',
		redirect_uri: ''
	};
	let errors: any;

	async function handleSignup() {
		errors = null;
		await signup(user)
			.then((response) => {
				message = response?.message ?? '';
				goto(`/${$store.meta.baseUri}/auth/confirm-email`);
			})
			.catch((error) => {
				errors = error;
				console.log(error);
			});
	}

	onMount(async () => {
		authorizerRef = authorizer();
	});
</script>

<div
	class="
		mx-auto
		mt-5
		grid
		grid-cols-2
		gap-4
		p-5
		sm:w-[100%]
		md:w-[75%]"
>
	<div class="relative h-full rounded-md bg-gray-200">
		<span />
	</div>

	<div>
		<div id="signup" />
		<h2 class="mb-4">Signup</h2>

		<form on:submit|preventDefault={handleSignup}>
			<div class="mb-3">
				<label for="email" class="form-label">Email</label>
				<input
					name="email"
					class="
					form-control
					h-10
					w-full
					rounded
					rounded-lg
					border
					border-gray-300
					px-2
					py-1
					text-sm
					outline-none"
					type="email"
					bind:value={user.email}
					placeholder="Email"
				/>
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input
					name="password"
					class="
					form-control
					h-10
					w-full
					rounded
					rounded-lg
					border
					border-gray-300
					px-2
					py-1
					text-sm
					outline-none"
					type="password"
					bind:value={user.password}
					placeholder="Password"
				/>
			</div>
			<div class="mb-3">
				<label for="confirm-password" class="form-label">Confirm Password</label>
				<input
					name="confirm-password"
					class="
					form-control
					h-10
					w-full
					rounded
					rounded-lg
					border
					border-gray-300
					px-2
					py-1
					text-sm
					outline-none"
					type="password"
					bind:value={user.confirm_password}
					placeholder="Repeat password"
				/>
			</div>
			<div style="position: relative">
				<button
					class="
				btn
				btn-secondary
				mt-3
				mb-5
				rounded-full
				bg-gray-600
				px-5
				py-2
				text-white
				hover:bg-gray-500"
					type="submit"
				>
					Submit
				</button>
				<span class="ml-3" style="position: absolute; top: 23px">
					Or <a href={`/${$store.meta.baseUri}/auth/signin`}><strong>login</strong></a>
				</span>
			</div>
		</form>

		<div>
			{message}
		</div>

		{#if errors}
			<div class="mt-4" style="color: red">
				{errors?.message}
			</div>
		{/if}
	</div>
</div>
