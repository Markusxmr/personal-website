import { writable, type Writable } from "svelte/store";

export const wineCodeStore: Writable<any> = writable({
    locale: "en"
});