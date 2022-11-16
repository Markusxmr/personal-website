<script lang="ts">
	import { authorizer } from '$lib/core/auth/authorizer';
	import { DEFAULT_PROFILE_IMAGE } from '$lib/core/constants';
	import { errorHandler } from '$lib/core/error';
	import { store } from '$stores/core';
	import type { Profile } from '$stores.types';
	import type { Authorizer, AuthorizerUser } from '$lib/core/auth/authorizer.lib';
	import FormField from '@smui/form-field';
	import Switch from '@smui/switch';
	import { onMount } from 'svelte';
	import { getNotificationsContext } from 'svelte-notifications';
	import './profile.scss';
	import { store as coreStore } from '$stores/core';

	$: BASE_URI = $coreStore.meta.baseUri;

	const notificationsContext = getNotificationsContext();
	let authorizerRef: Authorizer;
	let profile: Profile;
	let user: AuthorizerUser;
	let access_token: any;
	let defaultUser = {
		id: '',
		email: '',
		nickname: '',
		given_name: '',
		preferred_username: '',
		email_verified: false,
		signup_methods: '',
		created_at: -1,
		updated_at: -1
	};
	user = defaultUser;
	store.subscribe((state) => {
		profile = state?.profile;
	});

	onMount(async () => {
		authorizerRef = authorizer();
		access_token = localStorage.getItem('access_token') ?? null;
		await authorizerRef
			.getProfile({
				...(access_token ? { authorization: `Bearer ${access_token}` } : null)
			})
			.then((data) => {
				user = data || defaultUser;
			})
			.catch((error) => {
				console.log(error);
			});
	});

	async function handleUpdateProfile() {
		delete user.id;
		delete user.signup_methods;
		delete user.roles;
		delete user.email_verified;
		delete user.phone_number_verified;
		delete user.preferred_username;
		delete user.created_at;
		delete user.updated_at;

		await authorizerRef
			.updateProfile(user, {
				...(access_token ? { authorization: `Bearer ${access_token}` } : null)
			})
			.catch(errorHandler);

		notificationsContext?.addNotification({
			text: 'Profile updated',
			type: 'success',
			position: 'top-center',
			removeAfter: 5000
		});
	}
</script>

<div class="page page-content">
	<div class="banner bg-profile">
		<div class="hero" style="background-image: url(/music-code/images/banner/event.jpg);" />
	</div>

	<div class="under-hero profile-container container">
		<div class="row profile-content mt-5">
			<div class="col-sm-3 col-md-2">
				<div class="list-group list-tab" id="list-tab" role="tablist">
					<a
						class="list-group-item list-group-item-action active"
						id="list-home-list"
						data-bs-toggle="list"
						href="#list-home"
						role="tab"
						aria-controls="list-home">Profile</a
					>
					<a
						class="list-group-item list-group-item-action"
						id="list-profile-list"
						data-bs-toggle="list"
						href="#list-profile"
						role="tab"
						aria-controls="list-profile">Notifications</a
					>
					<a
						class="list-group-item list-group-item-action"
						id="list-messages-list"
						data-bs-toggle="list"
						href="#list-messages"
						role="tab"
						aria-controls="list-messages">Appearance</a
					>
					<a
						class="list-group-item list-group-item-action"
						id="list-settings-list"
						data-bs-toggle="list"
						href="#list-settings"
						role="tab"
						aria-controls="list-settings">Settings</a
					>
				</div>
			</div>
			<div class="col-sm-9 col-md-10">
				<div class="tab-content" id="nav-tabContent">
					<div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
						<div>
							<div class="col-xl-12 mx-auto">
								<div class="row">
									<div class="col-xl-4 col-md-5">
										<div class="card profile-overview h-auto">
											<div class="profile-overview-info">
												<div class="card-body text-center">
													<div class="avatar avatar-xl avatar-circle mx-auto mb-4">
														<img
															class="mx-auto text-center"
															src={DEFAULT_PROFILE_IMAGE}
															style="height: 128px; width: 128px;"
															alt="user"
														/>
													</div>
													<h6 class="mb-3">{user.given_name} {user.family_name}</h6>
													<button type="button" class="btn btn-air mt-3">Change Image</button>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-8 col-md-7">
										<div class="card h-auto">
											<div class="card-body">
												<form on:submit|preventDefault={handleUpdateProfile} class="row">
													<div class="col-xl-6 form-group">
														<label for="firstName" class="form-label">First Name</label>
														<input type="text" id="firstName" class="form-control" bind:value={user.given_name} />
													</div>
													<div class="col-xl-6 form-group">
														<label for="lastName" class="form-label">Last Name</label>
														<input type="text" id="lastName" class="form-control" bind:value={user.family_name} />
													</div>
													<div class="col-xl-6 form-group">
														<label for="displayName" class="form-label">Display Name</label>
														<input type="text" id="displayName" class="form-control" bind:value={user.nickname} />
													</div>
													<div class="col-xl-6 form-group">
														<label for="userType" class="form-label">User Type</label>
														<select name="userType" id="userType" class="form-control">
															<option value="0">Admin</option><option value="1">Artist</option>
															<option value="2">Producer </option>
															<option value="3">User</option>
														</select>
													</div>
													<div class="col-12 form-group">
														<label for="about" class="form-label">About</label>
														<textarea name="about" id="about" cols="30" rows="5" class="form-control" />
													</div>
													<div class="col-12">
														<button type="submit" class="btn btn-air">Save Changes</button>
													</div>
												</form>
											</div>
										</div>
										<div class="plan-info-card px-sm-5 py-sm-4 p-3 text-center">
											<h6>No plan selected yet</h6>
											<p>Your 30 days free subscription is going to expired within 2 days please select you plan.</p>
											<a href={`/${BASE_URI}/plans`} class="btn btn-pill btn-air btn-success">Select Plan</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
						<div class="row section">
							<div class="col-xl-12 mx-auto">
								<h5 class="mb-3">Notification</h5>
								<div class="d-flex align-items-center mb-1">
									<label for="not1" class="setting-label pr-2">Get email notifications</label>
									<div class="switch switch-primary ml-auto">
										<FormField align="end">
											<Switch icons={false} bind:value={profile.notifications.getEmailNotifications} />
										</FormField>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
						<div class="row section">
							<div class="col-xl-12 mx-auto">
								<h5 class="mb-3">Theme</h5>
								<div class="d-flex align-items-center">
									<label for="theme" class="setting-label pr-2">Night mode</label>
									<div class="switch switch-primary ml-auto">
										<FormField align="end">
											<Switch icons={false} bind:value={profile.theme.nightMode} />
										</FormField>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
				</div>
			</div>
		</div>
	</div>
</div>
