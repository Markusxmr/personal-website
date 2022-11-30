<script lang="ts">
	import { StringCodec } from 'nats.ws';
	import { customTransition } from '$lib/core/animations';
	import Button from '$lib/apps/cv/components/button.svelte';
	import { onMount } from 'svelte';
	import { sineOut, bounceIn, bounceOut, bounceInOut, quintOut, elasticInOut } from 'svelte/easing';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { stats } from './home.data';
	import Projects from '$lib/apps/cv/components/projects/projects.svelte';

	function toggleDetails(stat: any, i: number) {
		return (details: boolean) => {
			stats[i].details = !details;
		};
	}

	function animateProgressBar() {
		jQuery('.progress-bar').each(function () {
			let finalWidth = parseInt(jQuery(this).attr('aria-valuenow'));
			jQuery(this)
				.css('width', '0px')
				.animate({ width: `${finalWidth}%` }, 1500);
		});
	}

	onMount(async () => {
		animateProgressBar();
	});
</script>

<div transition:customTransition>
	<div transition:scale={{ delay: 250, duration: 650, easing: quintOut }} class="relative mb-10">
		<div
			class="card mt-5 w-full rounded-lg bg-gradient-to-r from-gray-50 to-gray-50 px-6 py-10 text-center text-gray-800"
		>
			<h1 class="mb-10 text-center text-4xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">Marko Rendulić</h1>
			<h5 class="page-subtitle mt-3 mb-4 text-center">Webz Enginner</h5>

			<p class="mt-4 text-center">
				I'm a Full Stack Web Developer based in Croatia. <br />
				Welcome to my personal custom built website. Also a personal sandbox platform containing multiple applications and
				various experiments.<br />
				Enjoy!
			</p>
		</div>
	</div>
	<div class="grid gap-3 sm:grid-cols-1 md:grid-cols-1">
		<div class="mt-2">
			<h1 class="text-center font-bold text-gray-900 dark:text-gray-900">Stats</h1>
			<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-1">
				<div class="card mx-auto w-full rounded-lg p-6">
					<div class="mb-3">
						{#each stats as stat, i}
							<div class="cmt-2 mt-4" style="cursor: pointer">
								<Button toggle={toggleDetails(stat, i)} details={stat.details}>{stat?.title?.toUpperCase()}</Button>
							</div>
							<div class="col-md-11 mt-2">
								<div class="dark:bg-white-700 h-4 w-full bg-gray-200">
									<div
										class="progress-bar h-4 rounded-r-sm bg-gradient-to-r from-gray-500 to-gray-700"
										role="progressbar"
										style="width: {`${stat.experience}%`}"
										aria-valuenow={stat.experience}
										aria-valuemin={0}
										aria-valuemax={100}
									/>
								</div>
								<div class="dark:bg-white-700 h-4 w-full bg-gray-200">
									<div
										class="progress-bar h-4 rounded-r-sm bg-gradient-to-r from-cyan-500 to-blue-500"
										role="progressbar"
										style="width: {stat.hype}%"
										aria-valuenow={stat.hype}
										aria-valuemin={0}
										aria-valuemax={100}
									/>
								</div>
							</div>
							{#if stat.details}
								<div
									class="mt-2 border-b-2 py-3"
									class:details-visible={stat.details}
									class:details-hidden={!stat.details}
									style="border-top: none !important;"
								>
									<div class="grid gap-3 sm:grid-cols-3 md:grid-cols-3">
										{#each stat.skills as skill}
											<div class="mb-3">
												<div class="h-5 w-full rounded-md bg-gray-200 dark:bg-gray-700">
													<div
														class="h-6 rounded-md bg-gradient-to-r from-green-400 to-green-500"
														role="progressbar"
														style="width: {`${skill.experience}%`}"
														aria-valuenow={skill.experience}
														aria-valuemin={0}
														aria-valuemax={100}
													>
														<span class="m-5 mb-5 pb-5 text-gray-700"><strong>{skill.tool}</strong></span>
													</div>
												</div>
											</div>
										{/each}
									</div>
								</div>
							{/if}
						{/each}
					</div>
					<div class="mt-2 mb-4">
						<div>
							<h5 class="grey">Legend</h5>
							<div>
								<span class="h-20 w-20 rounded-full bg-gray-700">
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								</span>
								&nbsp;
								<span>Experience</span>
							</div>
							<div>
								<span class="h-20 w-20 rounded-full bg-blue-400">
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								</span>
								&nbsp;
								<span>Hyped</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-10">
			<h1 class="text-center font-bold text-gray-900 dark:text-gray-900">Recent Projects</h1>
			<Projects cols={'sm:grid-cols-1 md:grid-cols-3'} />
		</div>
	</div>
</div>

<style>
	.grey {
		color: #777;
	}

	.details-visible {
		display: block;
	}

	.details-hidden {
		display: none;
	}
</style>
