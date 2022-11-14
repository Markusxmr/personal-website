import Stripe from 'stripe';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
// 	apiVersion: '2022-01-01'
// });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, null);

const plans = [
	{
		product: {
			name: 'WineCode',
			description: 'Subscription for unlimited listings and availability'
		},
		price: {
			currency: 'eur',
			unit_amount: 10000,
			recurring: {
				interval: 'year'
			}
		},
		includes: [
			'Unlimited number of listings',
			'Unlimited Availability',
		]
	},
];

async function main() {
	await Promise.all(
		plans.map(async (plan) => {
			// Only create the product if it's not free
			if (plan.price.unit_amount > 0) {
				const product = await stripe.products.create(plan.product);
				const price = await stripe.prices.create({
					...plan.price,
					product: product.id
				});
				console.log(`${plan.product.name} id: ${product.id}`);
				plan.product.id = product.id;
				plan.price.id = price.id;
			}
		})
	);
	fs.writeFileSync(
		path.join(path.resolve(path.dirname('')), './src/lib/stripe-data/winecode-plans-data.json'),
		JSON.stringify(plans, null, 2),
		'utf8'
	);
	console.log('Products created');
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});