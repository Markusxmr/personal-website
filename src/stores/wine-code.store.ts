import { writable, type Writable } from "svelte/store";

export const wineCodeStore: Writable<any> = writable({
    meta: {
        brandImage: '/core/images/brand/logo-92x92.png',
        siteName: 'Wine Code',
        siteUrl: 'https://winecode.city/'
    },
    locale: "en"
});