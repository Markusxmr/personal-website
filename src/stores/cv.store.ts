import { writable, type Writable } from "svelte/store";

export const cvStore: Writable<any> = writable({
    meta: {
        brandImage: '/cv/user/Marko.jpeg',
        siteName: 'Marko Rendulić',
        siteUrl: 'https://markorendulic.com/apps/cv'
    },
    dialog: null
});