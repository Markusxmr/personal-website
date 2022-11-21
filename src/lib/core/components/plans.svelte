<script lang="ts">
	import { getProfile } from '$lib/core/auth/authorizer';
	import Payment from '$lib/core/components/payment.svelte';
	import { getMembership } from '$lib/core/services/membership.service';
	import { formatPrice } from '$lib/core/utils/format-price.util';
	import { choosePlan } from '$lib/stripe/utils';
	import { getContext, onMount } from 'svelte';

	export let plans = [];
	export let membershipDomain = '';

	const { getStripe } = getContext('stripe');
	const stripe = getStripe();

	let user: any;
	let membership: any;
	let loading = true;

	onMount(async () => {
		try {
			user = await getProfile();
			membership = await getMembership({
				filters: {
					code: { $eq: membershipDomain }
				}
			});

			loading = false;
		} catch (error) {
			loading = false;
		}
	});
</script>

{#each plans as plan}
	<div class="col-xl-8 col-md-8 offset-md-2 shadow-border mx-auto max-w-[600px] rounded-lg">
		<div class=" px-sm-5 py-sm-4 p-4 text-center">
			<h1 class="text-success mb-4 text-gray-600">{plan?.product?.name}</h1>
			<p class="mb-4">
				{plan?.product?.description}
			</p>
			<h1 class="my-5 bg-gray-300 py-5 text-gray-700">
				{formatPrice(plan?.price?.unit_amount, plan?.price?.currency)} / {plan?.price?.recurring?.interval}
			</h1>
			<ul class="list-group list-group-flush mb-5">
				{#each plan?.includes as include}
					<li class="list-group-item mb-3 border-b border-gray-300">{include}</li>
				{/each}
			</ul>

			{#if loading}
				<span />
			{:else if !membership}
				<div class="action mb-5">
					<button
						on:click={() => choosePlan({ user, plan, stripe })}
						class="btn btn-pill btn-air btn-success px-3 py-2"
					>
						Get now
					</button>
				</div>
			{/if}
		</div>
	</div>
{/each}

<div class="mt-10">
	<Payment />
</div>

<style>
	.shadow-border {
		background-size: cover;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: rgb(0, 0, 0) 0px 0px 8px 0px;
	}
</style>
