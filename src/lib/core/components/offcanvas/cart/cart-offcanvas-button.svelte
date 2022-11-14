<script lang="ts">
	import Badge from '@smui-extra/badge';
	import { store as cartStore } from '$lib/core/shop/cart.store';

	$: qty = ($cartStore.items ?? []).reduce((acc, item) => {
		return item.qty;
	}, 0);
	$: count = $cartStore.items?.length * qty;
</script>

<div class="text-center" style="position: relative;" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightCart">
	<i
		aria-controls="offcanvasRightCart"
		class="fa fa-shopping-cart mt-2 ml-2"
		style="cursor: pointer; font-size: 25px; color: #777; margin-left: 10px"
	/>

	<span class="badge">
		<Badge aria-label="unread content count" style="margin-top: 10px; margin-left: 5px;">{count}</Badge>
	</span>
</div>

<style>
	.badge {
		margin-top: 10px;
	}

	@media only screen and (max-width: 650px) {
		.badge {
			position: absolute;
			left: 100px;
			margin-top: 0px;
		}
	}
</style>
