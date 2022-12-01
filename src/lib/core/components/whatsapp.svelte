<script lang="ts">
	import { scale } from 'svelte/transition';

	let num = '+3850976300757',
		msg = '',
		name = '';
	let showForm = false;

	function toggleWhatsappForm() {
		showForm = !showForm;
	}

	function sendHandle() {
		let win = window.open(`https://wa.me/${num}?text=I%27m%20api%20msg%20hello%20${name}%20friend%20${msg}`, '_blank');
		// win.focus();
	}
</script>

<i
	id="whatsapp"
	class="fa fa-whatsapp fa-3x cursor-pointer rounded-full bg-white text-green-500"
	aria-hidden="true"
	on:click={toggleWhatsappForm}
/>

{#if showForm}
	<div
		id="whatsappInput"
		in:scale={{ duration: 650, start: 0.95 }}
		out:scale={{ duration: 275, start: 0.95 }}
		class="rounded-lg shadow-lg outline-none"
	>
		<form
			class="rounded-lg p-5 shadow-xl"
			on:submit|preventDefault={sendHandle}
			style="background: rgba(180, 180, 180, 0.85);"
		>
			<h4 class="text-gray-800"><strong>Whatsapp contact</strong></h4>
			<button
				on:click={toggleWhatsappForm}
				aria-label="Close panel"
				class="
			text-dark-900
			hover:text-dark
			dark:text-dark-800
			hover:dark:text-dark-200
			absolute
			right-10 top-5 z-10 outline-none transition-all focus-visible:outline-none"
				tabindex="0"
				data-bs-dismiss="modal"
			>
				<svg
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="3xl:h-5 3xl:w-5 h-4 w-4 text-gray-800 focus-visible:outline-none lg:h-[18px] lg:w-[18px]"
					><path
						d="M17.0707 15.6566L11.414 9.99981L17.0708 4.34292C17.4611 3.95268 17.4611 3.31903 17.0707 2.92866C16.6805 2.53842 16.0468 2.53842 15.6566 2.92866L9.99969 8.58556L4.3428 2.92866C3.95256 2.53842 3.31891 2.53842 2.92867 2.92866C2.5383 3.31903 2.5383 3.95268 2.92854 4.34292L8.58544 9.99981L2.92867 15.6566C2.5383 16.0469 2.5383 16.6806 2.92854 17.0708C3.31891 17.4612 3.95256 17.4612 4.34293 17.0708L9.99969 11.4141L15.6565 17.0708C16.0468 17.4612 16.6805 17.4612 17.0708 17.0708C17.4611 16.6806 17.4611 16.0469 17.0707 15.6566Z"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="0.1"
					/>
				</svg>
			</button>
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
						bind:value={name}
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
						bind:value={msg}
					/>
				</div>
			</div>

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
				<button
					type="button"
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
					aria-controls="result"
					on:click={toggleWhatsappForm}
					>Close
				</button>
			</div>
		</form>
	</div>
{/if}

<style>
	.whatsappInputHidden {
		display: none;
	}
	.whatsappInputVisible {
		display: block;
	}
	#whatsappInput {
		position: fixed;
		z-index: 100;
		bottom: 410px;
		right: 25px;
		height: 40px;
		width: 400px;
	}
	#whatsapp {
		position: fixed;
		display: block;
		z-index: 100;
		bottom: 80px;
		right: 15px;
		height: 40px;
		width: 40px;
	}
</style>
