import plansTest from '$lib/stripe/products/winecode-plans-data.json';
import plansLive from '$lib/stripe/products/winecode-plans-data.json';
import * as dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env['NODE_ENV'];
export const plans = NODE_ENV === "production" ? plansLive : plansTest;