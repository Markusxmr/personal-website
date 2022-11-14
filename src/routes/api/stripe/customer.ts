import { updateUser } from '../user.service';
import stripe from './stripe';

export async function getCustomer({ request, user }) {
    const authorization = request?.headers.get("authorization");
    const stripe_id = user?.metadata?.stripe_id;
    const email = user?.email;
    const customerResults = await stripe.customers.search({ query: `metadata['email']:'${email}'` });
    let customer = customerResults?.data?.find(item => item?.metadata?.email === email);

    const metadata = { email, id: user?.id, stripe_id };

    if (!customer) {
        customer = await stripe.customers.create({
            metadata,
            name: user?.username,
            email: user?.email,
        });
    }

    metadata.stripe_id = customer?.id;

    await stripe.customers.update(customer?.id, {
        metadata,
    });
    await updateUser(user?.id, { metadata });

    return customer;
}