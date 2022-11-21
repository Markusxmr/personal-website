<div class="payment-container mx-auto">
	<img class="payment-image" src="/core/images/payment/visa.png" alt="" />
	<img class="payment-image" src="/core/images/payment/master-card.png" alt="" />
	<img class="payment-image" src="/core/images/payment/amex.svg" alt="" />
</div>

<style>
	.payment-container {
		display: grid;
		grid-template-columns: 1fr 1fr 100px;
		max-width: 600px;
		justify-items: center;
		justify-content: space-evenly;
	}
	.payment-image {
		height: 100px;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: rgb(0, 0, 0) 0px 0px 5px 0px;
	}

	@media only screen and (max-width: 640px) {
		.payment-container {
			grid-template-columns: 1fr;
		}
		.payment-image {
			grid-template-columns: 1fr;
			margin-top: 20px;
		}
	}
</style>
