<script lang="ts">
	import { customTransition } from '$lib/core/animations';
	import { platformsData } from '$lib/core/components/platforms/platforms-data';
	import { cvStore } from '$stores/cv.store';
	import { slice } from 'lodash';
	import Dialog from './dialog.svelte';

	const platformDescription =
		'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.';

	let platforms = platformsData?.filter((platform) => platform.active);

	function handleDialog(platform) {
		cvStore.update((state) => ({ ...state, dialog: platform }));
	}
</script>

<div>
	<Dialog />
</div>

<section transition:customTransition>
	<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">My Recent Projects</h1>
	<!-- background -->
	<div class="relative mt-10 grid min-h-screen gap-7 sm:grid-cols-1 md:grid-cols-3">
		{#each platforms as platform}
			<!-- card -->
			<div
				class="mx-auto w-auto rounded-2xl bg-white shadow-md shadow-slate-300/60 duration-300 ease-in-out hover:shadow-2xl"
			>
				<!-- img -->
				<img
					class="aspect-video w-auto rounded-t-2xl object-cover object-center shadow-sm"
					src={platform?.featuredImage}
					alt={platform?.title}
				/>
				<!-- text information -->
				<div class="relative mb-10 p-4">
					<a href={platform?.url} target="_blank" rel="noreferrer">
						<h1 class="pb-2 text-xl font-medium text-slate-600"><strong>{platform?.title}</strong></h1>
					</a>
					<p class="text-sm font-light leading-6 tracking-tight text-slate-400">
						{platform?.description?.length > 150
							? `${platform?.description.slice(0, 150)}...`
							: platform?.description
							? platform?.description
							: platformDescription}
					</p>
					<button
						type="button"
						class="
                            mt-5
                            rounded
                            bg-blue-600
                            px-6
                            py-2.5
                            text-xs
                            font-medium
                            uppercase
                            leading-tight
                            text-white
                            shadow-md transition
                            duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg
                            focus:bg-blue-700 focus:shadow-lg
                            focus:outline-none
                            focus:ring-0
                            active:bg-blue-800
                            active:shadow-lg"
						data-bs-toggle="modal"
						data-bs-target="#detailModal"
						on:click={() => handleDialog(platform)}
					>
						Details
					</button>
				</div>
			</div>
		{/each}
	</div>
</section>
