import { writable, type Writable } from "svelte/store";
import type { Store } from "./store.types";
import { App } from "../lib/core/enums";
import { APPLICATION, BASE_ROUTE } from "../lib/core/constants";
import { menus } from "../lib/core/menus";

const BASE_URI = `${BASE_ROUTE}/${(APPLICATION() ?? App.MUSIC_CODE).toLowerCase().replace('_', '-')}`;

export const store: Writable<Store> = writable({
    window: {
        scrollTop: false,
    },
    meta: {
        appName: (APPLICATION() ?? App.MUSIC_CODE).replace("_", ""),
        app: APPLICATION() ?? App.MUSIC_CODE,
        baseUri: BASE_URI,
        gqlClient: null,
    },
    isAuthenticated: false,
    auth: null,
    defaultUser: {
        id: '',
        email: '',
        given_name: '',
        preferred_username: '',
        email_verified: false,
        signup_methods: '',
        created_at: -1,
        updated_at: -1
    },
    profile: {
        notifications: {
            getEmailNotifications: false
        },
        theme: {
            nightMode: false
        },
    },
    theme: {
        darkBg: true,
        color: "light"
    },
    sidebar: {
        selectedMenu: menus[APPLICATION()] ? menus[APPLICATION()][0] : menus["EMPTY"][0],
        apps: {
            menus
        },
        showingOffCanvas: false
    },
    notification: {
        text: null,
        type: null
    },
});