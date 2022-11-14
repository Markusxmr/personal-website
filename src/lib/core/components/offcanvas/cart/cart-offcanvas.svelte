<script lang="ts">
	import { store } from '$lib/core/store';
	import { addToCart, removeFromCart } from '$lib/core/shop/actions';
	import { store as cartStore } from '$lib/core/shop/cart.store';

	$: BASE_URI = $store.meta.baseUri;

	$: total = ($cartStore.items ?? []).reduce((acc, item) => {
		return acc + item.price * item.qty;
	}, 0);
</script>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRightCart" aria-labelledby="offcanvasRightCart">
	<div class="offcanvas-header">
		<button type="button" class="btn-close pull-left" data-bs-dismiss="offcanvas" aria-label="Close">
			<i class="fa fa-close" />
		</button>
		<h5 class="offcanvas-title pull-right" id="offcanvasRightCart">Cart</h5>
	</div>
	<div class="offcanvas-body" style="position: relative;">
		<div class="offcanvas-body-title mb-4 px-3">
			<button class="btn pull-left" data-bs-dismiss="offcanvas"><i class="fa fa-close" /></button>
			<h3 class="pull-right mt-2">Cart</h3>
			<br />
		</div>

		<div class="border-bottom" />

		{#each $cartStore.items as item}
			<div class="my-6">
				<div class="two-columns-item my-4 mr-1">
					<img src={item.img} alt={item.name} style="width: 75px; height: 75px;" class="rounded-2 object-cover" />
					<div style="margin-right: 13px;">
						<div>
							<p style="font-weight: 500; font-size: 1.1rem">{item.name}</p>
						</div>
						<div class="row">
							<span class="col-3 mt-2">€{item.price}</span>
							<span class="col-6">
								<button
									class="btn btn-xs btn-outlined-secondary hover:btn-primary shadow-md"
									on:click={() => {
										removeFromCart(item.id);
									}}
								>
									<i class="fa fa-minus" />
								</button>
								<span>{item.qty}</span>
								<button
									class="btn btn-xs btn-outlined-secondary hover:btn-primary shadow-md"
									on:click={() => {
										addToCart(item);
									}}
								>
									<i class="fa fa-plus" />
								</button>
							</span>
							<span class="col-3 mt-2" style="padding-right: 13px;">€{item.price * item.qty}</span>
						</div>
					</div>
				</div>
				<div class="pl-3" />
			</div>
		{/each}

		{#if $cartStore.items?.length > 1}
			<div class="border-top mb-3" />

			<div class="two-columns">
				<p class="text-left">Shipping</p>
				<p>€0.00</p>
			</div>

			<div class="border-top mb-3" />

			<div class="two-columns">
				<p class="text-left">Total</p>
				<p>€{total}</p>
			</div>

			<div
				class="mx-auto mt-3 text-center"
				style="
				position: absolute;
				bottom: 10px;
				width: 95%;
				margin: 0 auto;
				overflow-y: none"
			>
				<button class="btn btn-block btn-secondary" data-bs-dismiss="offcanvas">
					<a href={`/${BASE_URI}/checkout`} style="color: inherit">
						<strong>Proceed to Checkout</strong>
					</a>
				</button>
			</div>
		{:else}
			<div class="mt-3 text-center">
				<h3 class="text-muted text-opacity-50">Cart is empty</h3>
			</div>
		{/if}
	</div>
</div>

<style>
	.two-columns-item {
		display: grid;
		grid-template-columns: 100px 1fr;
		grid-template-rows: auto;
	}
	.two-columns {
		display: grid;
		grid-template-columns: 70px 1fr;
		grid-template-rows: auto;
		justify-items: end;
		justify-content: space-evenly;
	}

	@media only screen and (max-width: 650px) {
		.offcanvas-body-title {
			display: none;
		}
	}
</style>
