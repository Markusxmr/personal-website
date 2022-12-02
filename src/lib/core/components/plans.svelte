<script lang="ts">
	import { getProfile } from '$lib/core/auth/authorizer';
	import { formatPrice } from '$lib/core/utils/format-price.util';
	import { getContext, onMount } from 'svelte';
	import { store } from '$stores/core';
	import { choosePlan } from '$lib/stripe/plan-selector';
	import { App } from '$lib/core/enums';
	import Payment from './payment.svelte';

	const { getStripe } = getContext('stripe');
	const stripe = getStripe();
	export let plans: any = [];
	let user: any;
	$: membership = $store?.profile?.membership;
	let loading = true;

	onMount(async () => {
		try {
			user = await getProfile();
		} catch (error) {
			console.log(error);
		}
		loading = false;
	});
</script>

<div>
	<div>
		<div class="row">
			{#each plans as plan}
				<div
					class="
					plan-container
					col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 sq-item wow fadeInUp animated
					col-xl-8 col-md-8 offset-md-2 shadow-border mx-auto max-w-[600px] rounded-lg
					"
				>
					<div class="plan text-center">
						<div class="plan-header">
							<h2 class="mb-4 text-gray-600">
								<strong>{plan?.product?.name}</strong>
							</h2>
							<p class="plan-tagline mx-auto">{plan?.product?.description}</p>
						</div>
						<div class="plan-content text-light bg-color">
							<div
								class="plan-content-price my-3 bg-gray-300 py-3 text-gray-700"
								style={$store.meta?.app === App.ART_CODE ? 'background-color: #333;' : ''}
							>
								<span class="euros">
									{formatPrice(plan?.price?.unit_amount, plan?.price?.currency)}
								</span>
								/ {plan?.price?.recurring?.interval}
							</div>
							<ul class="list-group list-group-flush text-center">
								{#each plan?.includes ?? [] as feature}
									<li
										class="fa fa-check list-group-item mb-1 mr-3 border-b border-gray-300"
										style="background-color: inherit; {$store.meta?.app === App.ART_CODE ? 'color: #fff' : ''}"
									>
										&nbsp;{feature}
									</li>
								{/each}
							</ul>
						</div>

						{#if loading}
							<span />
						{:else if !user}
							<div class="action mt-1">
								<a href={`/${$store?.meta?.baseUri}/auth/signin`} class="btn btn-pill btn-success px-3 py-2">
									Signin or signup
								</a>
							</div>
						{:else if !membership}
							<div class="action mt-1">
								<button
									on:click={() =>
										choosePlan({
											user,
											plan,
											stripe,
											platform: $store.meta?.app,
											url: `${$store.meta?.baseUri}`
										})}
									class="btn btn-pill btn-success px-3 py-2">Get now</button
								>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div style="margin-top: 25px;">
		<Payment />
	</div>
</div>

<style>
	.plan-container {
		background-size: cover;
		visibility: visible;
		animation-name: fadeInUp;
		animation-delay: 0.125s;
	}
	.plan {
		border-radius: 10px;
		background-size: cover;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: rgb(0 0 0) 0px 0px 8px 0px;
		padding: 20px 0px;
	}
	.plan-tagline {
		font-size: 18px;
		margin-bottom: 10px;
	}
	.plan-content {
		margin-bottom: 15px;
	}
	.plan-content-price {
		margin-bottom: 15px;
	}
	.euros {
		font-size: 2rem;
	}

	@media only screen and (max-width: 468px) {
		.plan {
		}
		.plan-tagline {
			max-width: 300px;
		}
	}
</style>
