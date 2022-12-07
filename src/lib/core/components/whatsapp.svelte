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

<span id="whatsapp" class="cursor-pointer rounded-full" on:keydown={toggleWhatsappForm} on:click={toggleWhatsappForm}>
	<svg
		version="1.1"
		id="Capa_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 58 58"
		style="enable-background:new 0 0 58 58;"
		xml:space="preserve"
	>
		<path
			style="fill:#2CB742;"
			d="M0,58l4.988-14.963C2.457,38.78,1,33.812,1,28.5C1,12.76,13.76,0,29.5,0S58,12.76,58,28.5
		S45.24,57,29.5,57c-4.789,0-9.299-1.187-13.26-3.273L0,58z"
		/>
		<path
			style="fill:#FFFFFF;"
			d="M47.683,37.985c-1.316-2.487-6.169-5.331-6.169-5.331c-1.098-0.626-2.423-0.696-3.049,0.42
		c0,0-1.577,1.891-1.978,2.163c-1.832,1.241-3.529,1.193-5.242-0.52l-3.981-3.981l-3.981-3.981c-1.713-1.713-1.761-3.41-0.52-5.242
		c0.272-0.401,2.163-1.978,2.163-1.978c1.116-0.627,1.046-1.951,0.42-3.049c0,0-2.844-4.853-5.331-6.169
		c-1.058-0.56-2.357-0.364-3.203,0.482l-1.758,1.758c-5.577,5.577-2.831,11.873,2.746,17.45l5.097,5.097l5.097,5.097
		c5.577,5.577,11.873,8.323,17.45,2.746l1.758-1.758C48.048,40.341,48.243,39.042,47.683,37.985z"
		/>
	</svg>
</span>

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
					right-10
					top-6
					z-10
					outline-none
					transition-all
					focus-visible:outline-none"
				tabindex="0"
				data-bs-dismiss="modal"
			>
				<svg
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="3xl:h-5 3xl:w-5 h-5 w-5 text-gray-800 focus-visible:outline-none lg:h-[18px] lg:w-[18px]"
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
					btn
					btn-primary
					text-primary
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
					on:click={toggleWhatsappForm}
					>Submit
				</button>
			</div>
		</form>
	</div>
{/if}

<style>
	#whatsapp {
		position: fixed;
		display: block;
		z-index: 100;
		bottom: 80px;
		right: 15px;
		height: 40px;
		width: 40px;
	}

	#whatsappInput {
		position: fixed;
		z-index: 100;
		bottom: 410px;
		right: 25px;
		height: 40px;
		width: 400px;
	}

	@media all and (max-width: 650px) {
		#whatsappInput {
			width: 100%;
			right: 0px;
		}
	}
</style>
