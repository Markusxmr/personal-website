import { writable, type Writable } from "svelte/store";

export const cvStore: Writable<any> = writable({
    dialog: null
});