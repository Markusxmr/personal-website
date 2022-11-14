<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import type { Authorizer, ValidateJWTTokenResponse } from '$lib/core/auth/authorizer.lib';
	import { authorizer, getProfile, logout } from '$lib/core/auth/authorizer';
	import { store } from '$lib/core/store';
	import { getLocalAuth } from '$lib/core/utils/auth.utils';
	import { App } from '$lib/core/enums';
	import { setApplication } from '$lib/core/utils/http.utils';
	import { getAppCtxByUrl } from '$lib/core/utils/app-context.utils';
	import { auth } from '$lib/apps/art-code/services/auth.service';

	beforeNavigate(async ({ from, to }) => {
		if (!browser) return;
		setApplication(getAppCtxByUrl());

		switch ($store.meta.app) {
			case App.ADMIN:
			case App.CV:
			case App.MUSIC_CODE:
				const access_token = localStorage.getItem('access_token') ?? '';
				const authorizerRef: Authorizer = authorizer();

				getLocalAuth();

				if (access_token) {
					const validateJWTToken: ValidateJWTTokenResponse | void = await authorizerRef
						.validateJWTToken({
							token_type: 'access_token',
							token: access_token
							// roles?: string[] | undefined;
						})
						.catch(async (error) => {
							console.log(error.message);
						});

					store.update((state) => ({
						...state,
						isAuthenticated: validateJWTToken ? validateJWTToken?.is_valid : false
					}));
				}

				if ($store.isAuthenticated === false) {
					await logout();
				}

				if ($store.isAuthenticated === true) {
					await getProfile();
				}
				break;

			case App.ART_CODE:
				await auth.me();

				let apikey = localStorage.getItem('API_KEY');
				let user = localStorage.getItem('user');
				let exists = (val: any) => val == undefined || val == 'undefined' || val == null || val == 'null';

				if (exists(apikey)) {
					localStorage.removeItem('API_KEY');
				}

				if (exists(user)) {
					localStorage.removeItem('user');
				}
				break;

			default:
				break;
		}
	});
</script>

<slot />
