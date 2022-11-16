<script lang="ts">
	import { goto } from '$app/navigation';
	import { store } from '$stores/core';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { setApplication } from '$lib/core/utils/app-context.utils';
	import { HREF_VOID } from '$lib/core/constants';
	import { App } from '$lib/core/enums';

	let show = false; // menu state
	let menu: HTMLElement; // menu wrapper DOM reference
	let apps = Object.values(App);

	onMount(async () => {
		const handleOutsideClick = (event: { target: any }) => {
			if (show && !menu?.contains(event?.target)) {
				show = false;
			}
		};

		const handleEscape = (event: { key: string }) => {
			if (show && event?.key === 'Escape') {
				show = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>

<div class="flex justify-center">
	<div class="relative  w-full" bind:this={menu}>
		<div>
			<a
				on:click={() => (show = !show)}
				on:mouseenter={() => (show = true)}
				href={HREF_VOID}
				class="menu block rounded py-2 pt-4 pr-4 pl-3 text-gray-800 dark:text-gray-800 md:bg-transparent md:p-0 md:text-blue-700"
				aria-expanded="false"
			>
				{$store.meta.app.replace('_', ' ') || 'Applications'}
				<svg
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="caret-down"
					class="ml-2 inline w-2"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
				>
					<path
						fill="currentColor"
						d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
					/>
				</svg>
			</a>

			{#if show}
				<ul
					on:mouseleave={() => (show = false)}
					in:scale={{ duration: 100, start: 0.95 }}
					out:scale={{ duration: 75, start: 0.95 }}
					class="
                    absolute
					z-50
					float-left
					m-0
					mt-1
					w-full
					min-w-max
					list-none
					rounded-lg
					border-none
					bg-white
					bg-clip-padding
					py-2
					text-left
					text-base
					shadow-lg
					"
				>
					{#each apps as app}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							on:click={() => {
								show = !show;
							}}
						>
							<a
								class="
                            block
                            w-full
                            whitespace-nowrap
                            bg-transparent
                            py-2
                            px-4
                            text-sm
                            font-normal
                            text-gray-700
                            hover:bg-gray-100"
								href={`${window.location.origin}/apps/${app?.toLowerCase().replace('_', '-')}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{app.replace('_', ' ')}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
