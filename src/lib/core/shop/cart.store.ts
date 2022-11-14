import { writable, type Writable } from "svelte/store";

type CartStore = {
    items: any[]
}

export const store: Writable<CartStore> = writable({
    items: []
});

