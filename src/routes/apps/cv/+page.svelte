<script lang="ts">
	import Button from '$lib/apps/cv/components/button.svelte';

	let stats = [
		{
			title: 'Front-end',
			experience: 90,
			hype: 85,
			details: false,
			skills: [
				{
					tool: 'HTML',
					description: 'HTML',
					experience: 100
				},
				{
					tool: 'CSS',
					description: 'CSS',
					experience: 100
				},
				{
					tool: 'Svelte',
					description: 'Svelte',
					experience: 100
				},
				{
					tool: 'Sveltekit',
					description: 'Sveltekit',
					experience: 100
				},
				{
					tool: 'React.js',
					description: 'React.js',
					experience: 100
				},
				{
					tool: 'React Native',
					description: 'React Native',
					experience: 100
				}
			]
		},
		{
			title: 'Back-end',
			experience: 80,
			hype: 70,
			details: false,
			skills: [
				{
					tool: 'Node.js',
					description: '',
					experience: 100
				},
				{
					tool: 'GraphQL',
					description: '',
					experience: 100
				},
				{
					tool: 'Nest.js',
					description: '',
					experience: 100
				},
				{
					tool: 'TypeORM',
					description: '',
					experience: 100
				},
				{
					tool: 'Elixir',
					description: '',
					experience: 100
				},
				{
					tool: 'Elixir/Phoenix Framework',
					description: '',
					experience: 100
				},
				{
					tool: 'Rust',
					description: '',
					experience: 100
				},
				{
					tool: 'PostgreSQL',
					description: '',
					experience: 100
				},
				{
					tool: 'SQLite',
					description: '',
					experience: 100
				},
				{
					tool: 'MySQL',
					description: '',
					experience: 100
				}
			]
		},
		{
			title: 'Devops',
			experience: 55,
			hype: 55,
			details: false,
			skills: [
				{
					tool: 'Linux',
					description: '',
					experience: 100
				},
				{
					tool: 'Ngnix',
					description: '',
					experience: 100
				},
				{
					tool: 'Docker',
					description: '',
					experience: 100
				},
				{
					tool: 'Digital Ocean',
					description: '',
					experience: 100
				},
				{
					tool: 'AWS Elastic Bean Stalk',
					description: '',
					experience: 100
				},
				{
					tool: 'AWS EC2',
					description: '',
					experience: 100
				},
				{
					tool: 'AWS Cognito',
					description: '',
					experience: 100
				}
			]
		},
		{
			title: 'Management',
			experience: 34,
			hype: 34,
			details: false,
			skills: [
				{
					tool: 'SCRUM',
					description: '',
					experience: 100
				},
				{
					tool: 'JIRA',
					description: '',
					experience: 100
				}
			]
		}
	];

	let perks = [
		{
			img: '/cv/images/about/Higher-Power.png',
			title: 'There is only One',
			subTitle: 'Christianity',
			description: ''
		},
		{
			img: '/cv/images/about/Groovy.png',
			title: 'No comment',
			subTitle: '',
			description: ''
		},
		{
			img: '/cv/images/about/Night-Bird.png',
			title: 'Night person',
			subTitle: '',
			description: ''
		},
		{
			img: '/cv/images/about/Grit.png',
			title: 'Martial Artist',
			subTitle: 'Taekwondo',
			description: ''
		},
		{
			img: '/cv/images/about/Physical.png',
			title: 'General Physical Culture',
			subTitle: 'Weight lifting, kettlebells, biking',
			description: ''
		},
		{
			img: '/cv/images/about/VitaminD.png',
			title: 'Sun lover',
			subTitle: '',
			description: ''
		}
	];

	function toggleDetails(stat: any, i: number) {
		return (details: boolean) => {
			stats[i].details = !details;
		};
	}
</script>

<div>
	<div class="border-1 mt-5 border-solid bg-gray-50 px-6 py-10 text-center text-gray-800">
		<h1 class="mb-10 text-center text-4xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">Marko Rendulić</h1>
		<h5 class="page-subtitle mt-3 mb-4 text-center">Webz Enginner</h5>

		<p class="mt-4 text-center">
			I'm a Full Stack Web Developer based in Croatia. <br />
			Welcome to my personal custom built website. Also a personal sandbox platform containing multiple applications and
			various experiments.<br />
			Enjoy!
		</p>
	</div>

	<div class="mt-5">
		<h2 class="text-center font-bold text-gray-900 dark:text-gray-900">Stats</h2>
		<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
			<div class="card mx-auto w-full rounded-lg p-6">
				<div class="mb-3">
					{#each stats as stat, i}
						<h5>{stat?.title}</h5>
						<div class="col-md-11 mt-2">
							<div class="dark:bg-white-700 h-4 w-full bg-gray-200">
								<div
									class="h-4 rounded-r-full bg-gray-700"
									role="progressbar"
									style="width: {stat.experience}%"
									aria-valuenow={stat.experience}
									aria-valuemin={0}
									aria-valuemax={100}
								/>
							</div>
							<div class="dark:bg-white-700 h-4 w-full bg-gray-200">
								<div
									class="h-4 rounded-r-full bg-blue-400"
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
												style="width: {skill.experience}%"
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

			<div class="card rounded-lg p-6">
				<div class="mb-10 grid gap-3 sm:grid-cols-12 md:grid-cols-3 lg:grid-cols-3">
					{#each perks as perk}
						<div class="flip-card">
							<div class="flip-card-inner">
								<div class="flip-card-front">
									<img
										class="img-perk"
										src={perk.img}
										alt=""
										style="
									height:200px;
									object-position: center;
									object-fit: cover;"
									/>
								</div>
								<div class="flip-card-back bg-gray-700">
									<h3 class="mt-5">{perk.title}</h3>
									<p>{perk.subTitle}</p>
									<p>{perk.description}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.img-perk {
		border-radius: 5px;
		width: 100%;
		box-shadow: 1px 3px 5px #444;
	}
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
