<script lang="ts">
	import { HREF_VOID } from '$lib/apps/art-code/constants';

	const platformDescription =
		'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.';

	const platforms = [
		{
			title: 'Kajbu',
			url: 'https://www.kajbu.org',
			description: platformDescription,
			active: true
		},
		{
			title: 'ArtCode',
			url: 'https://artcode.city',
			description: platformDescription,
			active: true
		},
		{
			title: 'SpiritualityCode',
			url: 'https://spiritualityCode.city',
			description: platformDescription,
			active: false
		},
		{
			title: 'FilmographyCode',
			url: 'https://filmographyCode.city',
			description: platformDescription,
			active: false
		},
		{
			title: 'FinanceCode',
			url: 'https://financeCode.city',
			description: platformDescription,
			active: false
		},
		{
			title: 'MusicCode',
			url: 'https://musiccode.city',
			description: platformDescription,
			active: true
		},
		{
			title: 'InnovationCode',
			url: 'https://innovationcode.city',
			description: platformDescription,
			active: false
		},
		{
			title: 'LiteratureCode',
			url: 'https://literaturecode.city',
			description: platformDescription,
			active: false
		},
		{
			title: 'WineCode',
			url: 'https://winecode.city',
			description: platformDescription,
			active: true
		},
		{
			title: 'ProductCode',
			url: 'false://productcode.city',
			description: platformDescription,
			active: true
		},
		{
			title: 'Terra Core',
			url: 'https://terracore.city',
			description: platformDescription,
			active: true
		},
		{
			title: 'Conjuctio',
			url: 'https://www.conjuctio.com',
			description: platformDescription,
			active: true
		}
	];

	function sortByTitle(array: any[]) {
		return array.sort((a, b) => {
			let ta = a.title.toLowerCase(),
				tb = b.title.toLowerCase();

			if (ta < tb) {
				return -1;
			}
			if (ta > tb) {
				return 1;
			}
			return 0;
		});
	}
</script>

<div class="page page-content container sm:px-10">
	<h1 class="ml-5 mt-10">Platforms</h1>

	<div class="m-5 mb-10">
		<div>
			<div class="card-container">
				{#each sortByTitle(platforms) as platform}
					<div>
						<div class="card-item flip-card">
							<div class="flip-card-inner">
								<div class="flip-card-front mdc-card mdc-card--outlined smui-card--padded bg-gray-200">
									<strong>{platform?.title}</strong>
									{#if !platform.active}
										<br />
										<span class="coming-soon">Coming soon</span>
									{/if}
								</div>
								<div class="flip-card-back bg-gray-700">
									<h3 class="mt-3 text-gray-200">{platform.title}</h3>
									<div class="px-4 text-justify text-[0.9rem]">{platform.description}</div>

									{#if platform.active}
										<a class="btn mt-3 text-blue-300" target="_blank" rel="noreferrer" href={platform?.url}>Explore</a>
									{/if}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<br />

<style>
	.card-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-gap: 10px;
	}

	.card-item .mdc-card {
		transition: 0.3s;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		height: 220px;
		text-align: center;
	}

	.card-item .mdc-card:hover {
		z-index: 1000;
	}

	@media screen and (max-width: 640px) {
		.card-container {
			grid-template-columns: 1fr;
		}
	}

	.coming-soon {
		color: #aaa;
	}

	/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
	.flip-card {
		background-color: transparent;
		width: 100%;
		min-height: 220px;
		perspective: 1000px;
		/* Remove this if you don't want the 3D effect */
		cursor: pointer;
	}

	/* This container is needed to position the front and back side */
	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	/* Do an horizontal flip when you move the mouse over the flip box container */
	.flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	}

	/* Position the front and back side */
	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden;
		/* Safari */
		backface-visibility: hidden;
		background-size: cover;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: rgb(134, 134, 134) 0px 0px 3px 0px;
	}

	/* Style the front side (fallback if image is missing) */
	.flip-card-front {
		color: black;
	}

	/* Style the back side */
	.flip-card-back {
		border-radius: 5px;
		box-shadow: 1px 3px 5px #444;
		color: white;
		transform: rotateY(180deg);
		height: 220px;
		overflow-y: scroll;
	}
</style>
