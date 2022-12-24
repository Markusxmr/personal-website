<script lang="ts">
	import { store } from '$stores/core';
	import { goto } from '$app/navigation';
	import { signin } from '$lib/core/auth/authorizer';

	let error: any = [];
	let user = {
		email: '',
		password: ''
	};
	let signupUrl = `/${$store.meta.baseUri}/auth/signup`;

	function handleError(err: any) {
		error = err;
		console.log(error);
	}

	async function handleSignin(event: any) {
		event.preventDefault();
		await signin(user, handleError).then((data) => {
			goto(`/${$store.meta.baseUri}`);
		});
	}
</script>

<div class="row w-auto">
	<div
		class="
		mx-auto
		mt-5
		grid
		gap-4
		p-5
		sm:w-[100%]
		md:w-[75%]
		md:grid-cols-1
		md:grid-cols-2"
	>
		<div class="col-sm-12 col-md-6 relative h-full w-auto rounded-md bg-gray-200">
			<span />
		</div>

		<div class="col-sm-12 col-md-6 w-auto">
			<h2 class="mb-4">Signin</h2>

			<div class="mb-3 w-[100%]">
				Signin using an existing account or create a new account
				<a href={signupUrl}>
					<strong>here</strong>.
				</a>
			</div>
			<form on:submit|preventDefault={handleSignin}>
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
				hover:bg-gray-500
		"
						type="submit">Signin</button
					>
					<span class="ml-3" style="position: absolute; top: 23px">
						<a href={signupUrl}>Or Register</a>
					</span>
				</div>
			</form>

			<div>
				{error}
			</div>
		</div>
	</div>
</div>
