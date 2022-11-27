<script lang="ts">
	import CartOffCanvasButton from '../offcanvas/cart/cart-offcanvas-button.svelte';
	import { logout } from '$lib/core/auth/authorizer';
	import { store } from '$stores/core';
	import { setApplication } from '$lib/core/utils/http.utils';
	import { goto } from '$app/navigation';
	import Icon from '@smui/select/icon';
	import Badge from '@smui-extra/badge';
	import IconButton from '@smui/icon-button';
	import { getNotificationsContext } from 'svelte-notifications';
	import { App } from '../../enums';
	import { HREF_VOID } from '$lib/apps/art-code/constants';
	import './header-alt.scss';
	import HeaderOffCanvasButton from '../offcanvas/header/header-offcanvas-button.svelte';

	const { addNotification } = getNotificationsContext();
	$: BASE_URI = $store.meta.baseUri;
	let accountValue = 'Account';
	let selectedLoggedAccountItem = '';
	let selectedLanguage = 'English';
	let languages = ['English', 'Italian', 'Croatian'];
	let accountItems = [
		{ name: 'Signin', url: `/auth/signin`, icon: 'fa fa-user' },
		{ name: 'Signup', url: `/auth/signup`, icon: 'fa fa-user' }
	];
	let apps = Object.values(App);

	let loggedInAccountItems = [
		{ name: 'Profile', url: `/profile`, icon: 'fa fa-user' },
		{ name: 'Dashboard', url: `/dashboard`, icon: 'fa fa-map' },
		{ name: 'Logout', url: `/`, icon: 'fa fa-signout' }
	];

	$: if (accountValue) {
		switch (accountValue) {
			case 'Signin':
				goto(`/${BASE_URI}/auth/signin`);
				break;
			case 'Signup':
				goto(`/${BASE_URI}/auth/signup`);
				break;

			default:
				break;
		}
	}

	$: if (selectedLoggedAccountItem) {
		switch (selectedLoggedAccountItem) {
			case 'Profile':
				goto(`/${BASE_URI}/profile`);
				break;
			case 'Plans':
				goto(`/${BASE_URI}/profile/plans`);
				break;

			case 'Logout':
				signout();
				break;
			default:
				break;
		}
	}

	function signout() {
		logout().then(() => {
			goto(`/${BASE_URI}`);

			addNotification({
				text: 'Logged out',
				type: 'warning',
				position: 'top-center',
				removeAfter: 5000
			});

			selectedLoggedAccountItem = 'Account';
		});
	}

	function selectApp(app: App) {
		setApplication(App[app]);
		goto(`/${$store.meta.baseUri}`);
		setApplication(App[app]);
	}
</script>

<nav class="navbar navbar-expand-lg border-bottom">
	<div class="container-fluid">
		<button
			class="btn sidebarToggle"
			id="sidebarToggle"
			on:click={() => {
				store.update((state) => {
					let showingOffCanvas = state.sidebar.showingOffCanvas;
					state.sidebar.showingOffCanvas = !showingOffCanvas;
					return state;
				});
			}}><span class="navbar-toggler-icon" /></button
		>
		<HeaderOffCanvasButton />
		<div class="offcanvas offcanvas-top h-50" tabindex="-1" id="offcanvasHeader" aria-labelledby="offcanvasHeader">
			<div class="offcanvas-header text-center">
				<h5 class="offcanvas-title text-center" id="offcanvasHeader">{$store.meta.appName}</h5>
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
			</div>
			<div class="offcanvas-body">
				<form class="d-flex search-container mt-2" role="search">
					<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
					<button class="btn btn-outline-success" type="submit">Search</button>
				</form>
				<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
					<li>
						<br />
					</li>
					{#if $store.meta.app === App.CV}
						<li>
							<div class="flex justify-center">
								<div>
									<div class="dropdown relative">
										<button
											class="
												dropdown-toggle
												flex
												items-center
												whitespace-nowrap
												rounded
												bg-blue-600
												px-6
												py-2.5
												text-xs
												font-medium
												uppercase
												leading-tight text-white
												shadow-md transition duration-150 ease-in-out
												hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
												focus:shadow-lg
												focus:outline-none
												focus:ring-0
												active:bg-blue-800
												active:text-white
												active:shadow-lg
												"
											type="button"
											id="dropdownMenuButton1"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											{$store.meta.app.replace('_', ' ') || 'Applications'}
											<svg
												aria-hidden="true"
												focusable="false"
												data-prefix="fas"
												data-icon="caret-down"
												class="ml-2 w-2"
												role="img"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 320 512"
											>
												<path
													fill="currentColor"
													d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
												/>
											</svg>
										</button>
										<ul
											class="
											dropdown-menu
											absolute
											z-50
											float-left
											m-0
											mt-1
											hidden
											hidden
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
											aria-labelledby="dropdownMenuButton1"
										>
											{#each apps as app}
												<!-- svelte-ignore a11y-click-events-have-key-events -->
												<li
													class="
													dropdown-item
													block
													w-full
													whitespace-nowrap
													bg-transparent
													py-2
													px-4
													text-sm
													font-normal
													text-gray-700
													hover:bg-gray-100
													"
													on:click={() => {
														selectApp(app);
													}}
												>
													<a class="dropdown-item" href={HREF_VOID}>
														{app.replace('_', ' ')}
													</a>
												</li>
											{/each}
										</ul>
									</div>
								</div>
							</div>
						</li>
					{/if}
					{#if $store.meta.app !== App.CV}
						<li class="nav-item dropdown" style="z-index: 1005 !important">
							<a
								class="nav-link dropdown-toggle"
								href={HREF_VOID}
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								{selectedLanguage || 'Language'}
							</a>
							<ul class="dropdown-menu">
								{#each languages as language}
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<li
										data-bs-dismiss="offcanvas"
										on:click={() => {
											selectedLanguage = language;
										}}
									>
										<a class="dropdown-item" href={HREF_VOID}>{language}</a>
									</li>
								{/each}
							</ul>
						</li>

						<li
							class="nav-item "
							style="z-index: 1004 !important"
							on:keydown={() => {
								goto(`/${BASE_URI}/plans`);
							}}
							on:click={() => {
								goto(`/${BASE_URI}/plans`);
							}}
						>
							<a class="nav-link" data-bs-dismiss="offcanvas" href={HREF_VOID} aria-expanded="false"> Plans </a>
						</li>
						{#if $store.isAuthenticated}
							<li class="nav-item dropdown" style="z-index: 1003 !important">
								<a
									class="nav-link dropdown-toggle"
									href={HREF_VOID}
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{$store.auth?.user?.email ?? 'Account'}
								</a>

								<ul class="dropdown-menu auth" style="width: 100%;">
									{#if $store.isAuthenticated}
										{#each loggedInAccountItems as item}
											{#if item.name.toLowerCase() !== 'logout'}
												<li data-bs-dismiss="offcanvas">
													<a class="dropdown-item" href={`/${BASE_URI}${item.url}`}>{item.name}</a>
												</li>
											{:else}
												<li>
													<hr class="dropdown-divider" />
												</li>
												<li data-bs-dismiss="offcanvas">
													<a class="dropdown-item" on:click={signout} href={`/${BASE_URI}${item.url}`}>{item.name}</a>
												</li>
											{/if}
										{/each}
									{/if}
								</ul>
							</li>
						{:else}
							<li
								class="nav-item "
								style="z-index: 1004 !important"
								on:keydown={() => {
									goto(`/${BASE_URI}/auth/signin`);
								}}
								on:click={() => {
									goto(`/${BASE_URI}/auth/signin`);
								}}
							>
								<a class="nav-link" data-bs-dismiss="offcanvas" href={HREF_VOID} aria-expanded="false"> Signin </a>
							</li>
						{/if}
					{/if}
				</ul>
			</div>
		</div>
	</div>
</nav>
