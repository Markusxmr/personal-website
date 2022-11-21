<script lang="ts">
	import { customTransition } from '$lib/core/animations';
	import Button from '$lib/apps/cv/components/button.svelte';
	import { onMount } from 'svelte';
	import { sineOut, bounceIn, bounceOut, bounceInOut, quintOut, elasticInOut } from 'svelte/easing';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { stats } from './home.data';

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

	onMount(() => {
		animateProgressBar();
	});
</script>

<div transition:customTransition>
	<div class="mt-10" transition:scale={{ delay: 250, duration: 650, easing: quintOut }}>
		<div class="card mt-5 bg-gray-50 px-6 py-10 text-center text-gray-800">
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
	<hr class="mt-20" />
	<div class="mt-12">
		<h1 class="text-center font-bold text-gray-900 dark:text-gray-900">STATS</h1>
		<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-1">
			<div class="card mx-auto w-full rounded-lg p-6">
				<div class="mb-3">
					{#each stats as stat, i}
						<h5>{stat?.title}</h5>
						<div class="col-md-11 mt-2">
							<div class="dark:bg-white-700 h-4 w-full bg-gray-200">
								<div
									class="progress-bar h-4 rounded-r-full bg-gray-600"
									role="progressbar"
									style="width: {`${stat.experience}%`}"
									aria-valuenow={stat.experience}
									aria-valuemin={0}
									aria-valuemax={100}
								/>
							</div>
							<div class="dark:bg-white-700 h-4 w-full bg-gray-200">
								<div
									class="progress-bar h-4 rounded-r-full bg-blue-400"
									role="progressbar"
									style="width: {stat.hype}%"
									aria-valuenow={stat.hype}
									aria-valuemin={0}
									aria-valuemax={100}
								/>
							</div>
						</div>
						<div class="cmt-2 text-center" style="cursor: pointer">
							<Button toggle={toggleDetails(stat, i)} details={stat.details} />
						</div>
						{#if stat.details}
							<div
								class="m-3 border p-3"
								class:details-visible={stat.details}
								class:details-hidden={!stat.details}
								style="border-radius: 5px; border-top: none !important;"
							>
								<div class="grid gap-3 sm:grid-cols-3 md:grid-cols-3">
									{#each stat.skills as skill}
										<div class="mb-5 mt-5">
											<div class="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
												<div
													class="h-4 rounded-full bg-green-600"
													role="progressbar"
													style="width: {`${skill.experience}%`}"
													aria-valuenow={skill.experience}
													aria-valuemin={0}
													aria-valuemax={100}
												/>
											</div>
											<h6 class="mt-2 text-center">{skill.tool}</h6>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					{/each}
				</div>
				<hr class="mt-10 pb-5" />
				<div class="mb-4">
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
