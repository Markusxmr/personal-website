import { goto } from "$app/navigation";
import { host } from "$lib/apps/art-code/axios.client";
import { store } from "$lib/core/store";
import { get } from "svelte/store";


export async function choosePlan({ user, plan, stripe }: { user: any, plan: { price: { id: any } }, stripe: any }) {
    const BASE_URI = get(store).meta.baseUri;
    if (!plan?.price?.id) goto(`/${BASE_URI}/checkout/error`);

    const { data } = await host.axiosClient().post(`/api/stripe/checkout-session`, { user, plan });
    stripe.redirectToCheckout({ sessionId: data?.sessionId });
}