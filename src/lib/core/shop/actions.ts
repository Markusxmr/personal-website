import { goto } from "$app/navigation";
import { store } from "./cart.store";
import { app } from "../utils/http.utils";

export function addToCart(item: any = null) {
    item.img = 'https://readonlydemo.vendure.io/assets/preview/9c/alexandru-acea-686569-unsplash__preview.jpg?w=300&amp;h=300';
    const id = item.id;

    store.update(state => {
        let items = state.items;
        const cartItem = items.find(cartItem => cartItem.id === id);
        if (cartItem) {
            items = items.map(cartItem => {
                if (cartItem.id === id) {
                    return {
                        ...cartItem,
                        qty: cartItem.qty + 1
                    }
                }

                return cartItem;
            })
        } else {
            items = state.items.concat([item]);
        }
        state.items = items;

        return state;
    })
}

export function removeFromCart(id: any = null) {
    store.update(state => {
        let items = state.items;
        const item = items.find(item => item.id === id);
        if (item?.qty > 1) {
            items = items.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        qty: item.qty - 1
                    }
                }

                return item;
            })
        } else {
            items = state.items.filter(item => item?.id !== id);

        }
        state.items = items;

        return state;
    })
}

export function buyTickets(id: any) {
    const application = app(localStorage.getItem("APPLICATION") ?? "music-code");
    goto(`/apps/${application}/tickets/${id}`);
}

export function checkout() {
    const application = app(localStorage.getItem("APPLICATION") ?? "music-code");
    goto(`/apps/${application}/checkout`);
}