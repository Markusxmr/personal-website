<script lang="ts">
	import SearchComponent from '$lib/apps/cv/components/search-component.svelte';
	import { articleShortDescription } from './[slug]/components/article';
	import { store } from '$stores/core';

	export let data: any;
	$: BASE_URI = $store.meta.baseUri;
	$: ({ articles } = data);
	let innerWidth = 0;
	$: characters = characterNum(innerWidth);

	function characterNum(innerWidth: number) {
		if (innerWidth <= 640) {
			return 55;
		}
		if (innerWidth <= 768) {
			return 100;
		}
		if (innerWidth <= 1024) {
			return 125;
		}
		if (innerWidth <= 1280) {
			return 175;
		}
		if (innerWidth > 1280) {
			return 300;
		}

		return 500;
	}

	$: getArticleShortDescription = (attributes: any, characters: any) => {
		return articleShortDescription(attributes, characters);
	};
</script>

<svelte:window bind:innerWidth />

<div>
	<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">Blogs</h1>
	<div class="mt-16">
		<SearchComponent />
	</div>

	<section>
		<div class="flex items-center justify-between" style="opacity: 1;">
			<h3 class="my-10 text-left text-2xl font-bold sm:text-3xl" style="opacity: 1; transform: none;">
				All Posts ({articles?.data?.cms?.cvArticles?.data?.length})
			</h3>
			<div class="flex items-center gap-2">
				<a href={`/${BASE_URI}/blogs/bookmark`} style="opacity: 1; transform: none;"
					><svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 16 16"
						class="cursor-pointer text-2xl"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
						><title>Bookmark</title><path
							d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
						/></svg
					></a
				><a href="/rss" style="opacity: 1; transform: none;"
					><svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 24 24"
						class="cursor-pointer text-3xl"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
						><title>RSS</title><path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z" /><path
							d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z"
						/><circle cx="6" cy="18" r="2" /></svg
					></a
				>
			</div>
		</div>
		<div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
			{#each articles?.data?.cms?.cvArticles?.data ?? [] as { id, attributes }}
				<div
					class="
					card
					mb-2
					block
					h-52
					rounded-md
					border 
					border-gray-200
					bg-white
					p-6
					shadow-md
					hover:bg-gray-100
					dark:border-gray-700"
				>
					<div>
						<h5 class="text-lg font-bold tracking-tight text-white dark:text-gray-900">
							{attributes.title}
						</h5>
						<p class="font-normal text-gray-700 dark:text-gray-400">
							{@html getArticleShortDescription(attributes, characters)}
						</p>
						<div class="relative mt-10 flex items-center justify-between">
							<a
								href={`/${BASE_URI}/blogs/${attributes.slug}`}
								class="
								w-fit select-none
								rounded-lg
								bg-black
								px-5
								py-2
								text-xs
								font-medium
								text-white
								transition-all
								hover:-translate-y-1
								hover:bg-neutral-900
								active:scale-95
								md:px-6
								md:py-2.5"
							>
								Read more
							</a>
							<button title="Save for Later" class="transition active:scale-75"
								><svg
									stroke="currentColor"
									fill="currentColor"
									stroke-width="0"
									viewBox="0 0 16 16"
									class="h-6 w-6"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
									><path
										d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			{/each}
			{#if articles?.isFetching}
				Loading
			{/if}
		</div>
	</section>
</div>
