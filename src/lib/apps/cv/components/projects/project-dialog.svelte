<script lang="ts">
	import { fade } from 'svelte/transition';
	import EyeIcon from '$lib/core/components/icons/eye.svelte';
	import LinkIcon from '$lib/core/components/icons/link.svelte';
	import { cvStore } from '$stores/cv.store';
	import DialogCarousel from './project-dialog-carousel.svelte';
	import { onMount } from 'svelte';

	$: item = $cvStore.dialog;
	let urlClipboard = '';

	function copyTextToClipboard(text: string) {
		urlClipboard = text;
		navigator.clipboard.writeText(text).then(
			function () {
				console.log('Async: Copying to clipboard was successful!');
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
			}
		);
	}
	let modal: HTMLElement | null;
	let closeButton: HTMLElement | null;

	function modalClose() {
		if (!modal) return;
		modal.classList.remove('fadeIn');
		modal.classList.add('fadeOut');
		setTimeout(() => (modal.style.display = 'none'), 500);
		cvStore.update(state => ({ ...state, dialog: null }))
	}

	onMount(() => {
		modal = document.querySelector('.main-modal');
		closeButton = document.querySelectorAll('.modal-close');

		if (modal && closeButton) {
			for (let i = 0; i < closeButton?.length; i++) {
				const elements = closeButton?.[i] as HTMLElement;
				elements.onclick = (e) => modalClose();
				modal.style.display = 'none';
				window.onclick = function (event) {
					if (event.target == modal) modalClose();
				};
			}
		}
	});

	function handleCloseModalOnEscape(event) {
		if (event?.key === 'Escape') {
			modalClose();
		}
	}
</script>

<div
	on:keyup={handleCloseModalOnEscape}
	transition:fade
	class="
	main-modal
	modal
    animated
    fadeIn
    faster
    fixed
    top-0
    left-0
    mx-auto
    my-auto
    hidden
    h-full
    w-full
    overflow-y-auto
    overflow-x-hidden
	bg-black/30 outline-none backdrop-blur-sm"
	id="detailModal"
	tabindex="-1"
	aria-labelledby="detailModalLabel"
	aria-hidden="true"
	style="z-index: 3000"
	data-bs-keyboard="false"
	aria-modal="true"
	role="dialog"
>
	<div class="modal-dialog pointer-events-none relative mx-auto">
		<div
			class="modal-content pointer-events-auto relative mx-auto flex flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none"
		>
			<div
				class="modal-header flex flex-shrink-0 items-center justify-between border-b border-gray-200 bg-gray-800 p-4"
			>
				<h1 class="mx-auto mb-0 text-2xl font-medium leading-normal text-gray-200" id="detailModalLabel">
					<strong>
						{item?.title}
					</strong>
				</h1>
				<button
					on:click={modalClose}
					aria-label="Close panel"
					class="modal-close text-dark-900 hover:text-dark dark:text-dark-800 hover:dark:text-light-200 absolute right-10 top-5 z-10 outline-none transition-all focus-visible:outline-none"
					tabindex="0"
					data-bs-dismiss="modal"
				>
					<svg
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="3xl:h-5 3xl:w-5 h-4 w-4 text-gray-200 focus-visible:outline-none lg:h-[18px] lg:w-[18px]"
						><path
							d="M17.0707 15.6566L11.414 9.99981L17.0708 4.34292C17.4611 3.95268 17.4611 3.31903 17.0707 2.92866C16.6805 2.53842 16.0468 2.53842 15.6566 2.92866L9.99969 8.58556L4.3428 2.92866C3.95256 2.53842 3.31891 2.53842 2.92867 2.92866C2.5383 3.31903 2.5383 3.95268 2.92854 4.34292L8.58544 9.99981L2.92867 15.6566C2.5383 16.0469 2.5383 16.6806 2.92854 17.0708C3.31891 17.4612 3.95256 17.4612 4.34293 17.0708L9.99969 11.4141L15.6565 17.0708C16.0468 17.4612 16.6805 17.4612 17.0708 17.0708C17.4611 16.6806 17.4611 16.0469 17.0707 15.6566Z"
							fill="currentColor"
							stroke="currentColor"
							stroke-width="0.1"
						/>
					</svg>
				</button>
			</div>

			<div
				class="modal-body 3xl:space-x-10 relative flex flex-col p-4 p-4 md:p-6 lg:flex-row lg:space-x-7 xl:space-x-8 xl:p-8"
			>
				<div
					class="3xl:max-w-[795px] mb-4 w-full shrink-0 items-center justify-center overflow-hidden md:mb-6 lg:mb-auto lg:max-w-[480px] xl:flex xl:max-w-[570px] 2xl:max-w-[650px]"
				>
					<div class="w-full">
						<div class="relative mb-3 w-full overflow-hidden xl:mb-5">
							{#if item}
								<DialogCarousel />
							{/if}
						</div>
					</div>
				</div>
				<div class="text-13px 3xl:w-[555px] flex shrink-0 flex-col justify-between lg:w-[400px] xl:w-[520px]">
					<div class="xs:pb-8 pb-7 lg:pb-10">
						<div class="dark:text-light-600 3xl:pb-8 pb-5 leading-[1.9em] xl:pb-6">
							{item?.description ?? ''}
						</div>
						<div class="border-light-500 dark:border-dark-500 3xl:py-5 flex space-x-6 border-t py-3 md:py-4">
							<div class="text-dark dark:text-light flex items-center tracking-[.1px]">
								<span class="mr-2"><EyeIcon /></span>
								6 Views
							</div>
						</div>
						<div class="text-13px border-light-500 dark:border-dark-500 3xl:py-10 space-y-4 border-t py-5 lg:py-6">
							<div class="text-dark dark:text-light flex items-start">
								<strong class="text-dark-600 dark:text-light-600 flex w-36 flex-shrink-0 items-center font-normal"
									><span class="text-dark-900 dark:text-light-900 w-8 flex-shrink-0">
										<LinkIcon />
									</span>URL:</strong
								>
								<span class="font-medium"><a href={item?.url} target="_blank">{item?.url}</a></span>
							</div>
							<div class="text-dark dark:text-light flex items-start">
								<strong class="text-dark-600 dark:text-light-600 flex w-36 flex-shrink-0 items-center font-normal"
									><span class="text-dark-900 dark:text-light-900 w-8 flex-shrink-0"
										><svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]"
											><path
												d="M54.2015 4.12793C58.2465 0.0829839 64.9636 -0.166405 69.3547 4.12793L95.8727 30.6459C100.057 34.8303 100.057 41.6146 95.8727 45.7991C91.8277 49.844 85.1109 50.141 80.7195 45.7991L78.8256 43.904L63.0131 59.7165C67.7834 72.6269 64.5896 88.5594 54.2015 98.835C53.0802 99.9443 51.3543 99.7998 50.4133 98.835L27.6825 76.1036L10.6363 93.1526C9.59016 94.1987 7.89408 94.1987 6.84798 93.1526C5.88234 92.187 5.71266 90.509 6.84798 89.3643L23.8948 72.3159L1.16555 49.5873C0.199916 48.6217 0.014091 46.9505 1.16555 45.7991C11.3009 35.6637 26.6956 32.0361 40.2815 36.9848L56.094 21.1723L54.2015 19.2811C49.8838 14.9411 50.1566 8.17287 54.2015 4.12793V4.12793ZM65.5664 7.91621C63.4742 5.824 60.082 5.824 57.9898 7.91621C56.0077 9.89831 55.8195 13.2582 57.9898 15.4928L61.7781 19.2811C62.7437 20.2467 62.88 21.9645 61.7781 23.0693L42.8445 42.0041C42.08 42.7686 40.9309 42.9986 39.9311 42.5872C29.3937 38.2517 16.6601 39.5018 6.92602 47.772L52.2259 93.0719C60.0995 83.9622 61.7781 70.251 57.4141 60.0714C56.908 58.8907 57.4141 57.7371 57.9898 57.1583L76.9312 38.2226C77.8968 37.2569 79.5573 37.0953 80.7195 38.2226L84.5078 42.0108C86.6 44.103 89.9922 44.103 92.0844 42.0108C94.0665 40.0287 94.2789 36.6831 92.0844 34.4342L65.5664 7.91621Z"
												fill="currentColor"
												stroke="currentColor"
												stroke-width="1.5"
											/></svg
										></span
									>Layout:</strong
								><span class="font-medium">{item?.layout}</span>
							</div>
							<div class="text-dark dark:text-light flex items-start">
								<strong
									class="text-dark-600 dark:text-light-600 flex w-36 flex-shrink-0 items-center pt-0.5 font-normal"
									><span class="text-dark-900 dark:text-light-900 w-8 flex-shrink-0"
										><svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
											><path
												d="M17.125 1H12.3677C11.4662 1 10.6188 1.351 9.98123 1.98849L1.63974 10.33C1.22725 10.7425 1 11.2908 1 11.8765C1 12.4593 1.22725 13.0075 1.63974 13.42L6.58 18.3603C6.99249 18.7728 7.54075 19 8.12649 19C8.70924 19 9.2575 18.7728 9.66999 18.3603L18.0115 10.0188C18.649 9.38125 19 8.53374 19 7.63226V2.87499C19 1.8415 18.1585 1 17.125 1ZM18.25 7.63226C18.25 8.33352 17.977 8.99277 17.482 9.48777L9.13976 17.83C8.6005 18.3693 7.65476 18.373 7.111 17.83L2.17 12.889C1.89926 12.619 1.74999 12.259 1.74999 11.8735C1.74999 11.491 1.89923 11.131 2.17 10.8603L10.5115 2.51875C11.008 2.02301 11.6665 1.74999 12.3677 1.74999H17.125C17.7452 1.74999 18.25 2.25473 18.25 2.87499V7.63226H18.25Z"
												fill="currentColor"
												stroke="currentColor"
												stroke-width="0.5"
											/><path
												d="M14.8749 3.25C13.8414 3.25 12.9999 4.0915 12.9999 5.12499C12.9999 6.15848 13.8414 6.99998 14.8749 6.99998C15.9084 6.99998 16.7499 6.15851 16.7499 5.12499C16.7499 4.0915 15.9084 3.25 14.8749 3.25ZM14.8749 6.24999C14.2546 6.24999 13.7499 5.74525 13.7499 5.12499C13.7499 4.50473 14.2546 3.99999 14.8749 3.99999C15.4952 3.99999 15.9999 4.50473 15.9999 5.12499C15.9999 5.74525 15.4951 6.24999 14.8749 6.24999Z"
												fill="currentColor"
												stroke="currentColor"
												stroke-width="0.5"
											/></svg
										></span
									>Tags:</strong
								>
								<div class="flex flex-wrap gap-2">
									{#each item?.tags ?? [] as tag}
										<a
											class="border-light-600 text-light-base hover:bg-light-200 hover:text-dark-300 dark:border-dark-500 dark:text-light-600 dark:hover:bg-dark-400 hover:dark:text-light inline-flex items-center justify-center rounded border px-2 py-0.5 font-medium transition-all"
											href="/products/tags/ecommerce">{tag}</a
										>
									{/each}
								</div>
							</div>
						</div>
						<div class="border-light-500 dark:border-dark-500 border-t pt-5">
							<div class="text-13px flex lg:items-center">
								<div class="dark:text-light-600 flex-shrink-0 pt-2 ltr:pr-4 sm:w-36 lg:pt-0">Share this item:</div>
								<div class="flex flex-wrap gap-2 md:gap-3">
									<div class="product-share flex flex-shrink-0 flex-wrap items-center gap-1.5 md:gap-2.5 xl:gap-3">
										<a
											aria-label="facebook"
											href="https://www.facebook.com/sharer/sharer.php?u={item?.url}"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex text-teal-700 hover:text-teal-900"
											title="Share on Facebook"
											style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;"
											><svg
												viewBox="0 0 64 64"
												width="64"
												height="64"
												class="text-md h-9 w-9 transition-all xl:h-10 xl:w-10"
												><circle cx="32" cy="32" r="31" fill="#3b5998" /><path
													d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
													fill="white"
												/></svg
											></a
										><a
											href="https://twitter.com/intent/tweet?text={item?.title}&amp;url={item?.url}"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex text-teal-700 hover:text-teal-900"
											title="Share on Twitter"
											><svg
												viewBox="0 0 64 64"
												width="64"
												height="64"
												class="text-md h-9 w-9 transition-all xl:h-10 xl:w-10"
												><circle cx="32" cy="32" r="31" fill="#00aced" /><path
													d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"
													fill="white"
												/></svg
											></a
										><a
											href="https://www.linkedin.com/shareArticle?mini=true&amp;url={item?.url}&amp;title={item?.title}&amp;summary={item?.description}&amp;source=LinkedIn"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex text-teal-700 hover:text-teal-900"
											title="Share on LinkedIn"
											style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;"
											><svg
												viewBox="0 0 64 64"
												width="64"
												height="64"
												class="text-md h-9 w-9 transition-all xl:h-10 xl:w-10"
												><circle cx="32" cy="32" r="31" fill="#007fb1" /><path
													d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"
													fill="white"
												/></svg
											></a
										>
									</div>
									<button
										on:click={() => copyTextToClipboard(item?.url)}
										class="border-light-600 text-dark-600 hover:bg-light-200 hover:text-dark dark:border-dark-500 dark:text-light-600 hover:dark:bg-dark-500 dark:hover:text-light flex h-9 flex-shrink-0 items-center rounded-full border px-3 md:px-4 xl:h-10"
									>
										<span class="mr-2"><LinkIcon /> </span>
										<span>
											{#if urlClipboard && urlClipboard === item?.url}
												Copied
											{:else}
												Copy link
											{/if}
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						class="xs:flex-row xs:gap-2.5 xs:pb-4 3xl:pb-14 flex flex-col-reverse items-center md:flex-nowrap md:gap-3.5 lg:gap-4"
					/>
				</div>
			</div>
			<div class="modal-footer mx-auto mb-4 flex flex-shrink-0 items-center justify-between p-4">
				<button
					on:click={modalClose}
					type="button"
					data-bs-dismiss="modal"
					class="modal-close mt-5 rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
				>
					Close
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.animated {
		-webkit-animation-duration: 1s;
		animation-duration: 1s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}

	.animated.faster {
		-webkit-animation-duration: 300ms;
		animation-duration: 300ms;
	}

	.fadeIn {
		-webkit-animation-name: fadeIn;
		animation-name: fadeIn;
	}

	.fadeOut {
		-webkit-animation-name: fadeOut;
		animation-name: fadeOut;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}
</style>
