<script lang="ts">
	import { store } from '$lib/core/store';
	import { goto } from '$app/navigation';
	import { login } from '$lib/core/auth/authorizer';

	$: BASE_URI = $store.meta.baseUri;

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
			goto(`/${BASE_URI}`);
		});
	}
</script>

<div class="page-content page container mx-auto mt-5 p-5 sm:w-[100%] md:w-[50%]">
	<div id="login" />
	<h2>Login</h2>

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
