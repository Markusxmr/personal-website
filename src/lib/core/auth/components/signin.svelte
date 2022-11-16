<script lang="ts">
	import { store } from '$stores/core';
	import { goto } from '$app/navigation';
	import { login } from '$lib/core/auth/authorizer';

	let error: any = [];
	let loginData = {
		email: '',
		password: ''
	};

	function handleError(err: any) {
		error = err;
		console.log(error);
	}

	async function handleLogin(event: any) {
		event.preventDefault();
		await login(loginData, handleError).then((data) => {
			goto(`/${$store.meta.baseUri}`);
		});
	}
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
		<div id="login" />
		<h2 class="mb-4">Login</h2>

		<div class="mb-3 w-[100%]">
			Login using an existing account or create a new account
			<a href={`/${$store.meta.baseUri}/auth/signup`}>
				<strong>here</strong>.
			</a>
		</div>
		<form on:submit|preventDefault={handleLogin}>
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
					bind:value={loginData.email}
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
					bind:value={loginData.password}
					placeholder="Password"
				/>
			</div>

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
				hover:bg-gray-500
		"
				type="submit">Submit</button
			>
		</form>

		<div>
			{error}
		</div>
	</div>
</div>
