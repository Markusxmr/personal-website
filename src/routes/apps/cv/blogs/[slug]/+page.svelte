<script lang="ts">
	import { goto } from '$app/navigation';
	import About from '$lib/apps/cv/components/about.svelte';
	import { articleShortDescription } from './components/article';
	import Blog from './components/blog.svelte';
	import SharePost from './components/share-post.svelte';
	import { store as coreStore } from '$stores/core';
	import { scrollTop } from '$lib/core/utils/scroll.utils';

	$: BASE_URI = $coreStore.meta.baseUri;

	export let data: any;
	$: ({ article, articles } = data);

	function navigateToArticle(article: any) {
		goto(`/${BASE_URI}/blogs/${article?.slug}`);
	}
</script>

<main>
	{#if article}
		<div class="p-15 text-bg-dark mt-10 mb-4 rounded p-4">
			<div class="col-md-6 mx-auto px-0">
				<h1 class="text-center">{article?.attributes?.title}</h1>
				<p class="lead my-3 text-center">August 31, 2020 · 12 min read · Programming</p>
			</div>
		</div>

		<div class="grid grid-cols-9 gap-6">
			<div class="col-span-6">
				{#if article?.attributes?.content}
					{@html article.attributes?.content}
				{:else}
					<Blog />
				{/if}

				<SharePost />

				<nav class="blog-pagination" aria-label="Pagination">
					<a class="btn btn-outline-primary rounded-pill" href="#">Older</a>
					<a class="btn btn-outline-secondary rounded-pill disabled">Newer</a>
				</nav>

				<br />

				<div class="my-8 flex items-center">
					<a href="/{BASE_URI}/blogs" class="inline-flex rounded no-underline hover:underline"
						><svg
							version="1.1"
							class="fa-icon svelte-1b2zbdf mt-1 mr-3"
							width="12"
							height="24"
							role="presentation"
							viewBox="0 0 256 512"
							style="font-size: 1.5em"
						>
							<path
								id="path-0"
								d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
							/>
						</svg> Back to Blog overview</a
					>
				</div>

				<br />

				<div class="mb-5 grid sm:grid-cols-1 md:grid-cols-2">
					{#each articles?.data?.blog_article ?? [] as article}
						<div>
							<div
								class="g-0 flex-md-row h-md-250 position-relative mb-4 overflow-hidden rounded border shadow-sm"
								style="min-height: 270px;"
							>
								<div class="col d-flex flex-column position-static p-4">
									<strong class="d-inline-block text-primary mb-2">World</strong>
									<h4 class="mb-0">{article?.title}</h4>
									<div class="text-muted mb-1">{article.created_at}</div>
									<p class="card-text mb-auto">
										{articleShortDescription(article)}
									</p>
									<a
										href="#top"
										on:click={() => {
											navigateToArticle(article);
											scrollTop();
										}}
										class="stretched-link mt-10">Continue reading</a
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="col-span-3">
				<div class="sticky top-16">
					<div class="bg-light mb-3 rounded bg-gray-50 p-10 text-center">
						<h4>About</h4>
						<About />
					</div>

					<div class="p-4">
						<h4 class="fst-italic">Archives</h4>
						<ol class="list-unstyled mb-0">
							<li><a href="#">November 2022</a></li>
							<li><a href="#">October 2022</a></li>
						</ol>
					</div>

					<div class="p-4">
						<h4 class="fst-italic">Elsewhere</h4>
						<ol class="list-unstyled">
							<li>
								<a href="https://github.com/Markusxmr" target="_blank" rel="noopener noreferrer">GitHub</a>
							</li>
							<li>
								<a href="https://twitter.com/MarkoMarkus" target="_blank" rel="noopener noreferrer">Twitter</a>
							</li>
							<li>
								<a href="https://www.facebook.com/marko.rendulic8/" target="_blank" rel="noopener noreferrer"
									>Facebook</a
								>
							</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>
