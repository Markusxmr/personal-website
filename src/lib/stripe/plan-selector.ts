import { goto } from "$app/navigation";
import { host } from "$lib/core/clients/axios.client";
import type { App } from "$lib/core/enums";
import { store } from "$stores/core";
import { get } from "svelte/store";

export async function choosePlan(
    { user, plan, stripe, platform, url }:
        { user: any, plan: { price: { id: any } }, stripe: any, platform: App, url: string }) {
    const BASE_URI = get(store).meta.baseUri;
    if (!plan?.price?.id) goto(`/${BASE_URI}/checkout/error`);

    const { data } = await host.axiosClient().post(`/api/stripe/checkout-session`, { user, plan, platform, url });
    stripe.redirectToCheckout({ sessionId: data?.sessionId });
}