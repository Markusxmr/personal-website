import type { AuthToken, User } from "@authorizerdev/authorizer-js";
import type { App } from "../lib/core/enums";

export type Profile = {
    notifications: {
        getEmailNotifications: boolean
    },
    theme: {
        nightMode: boolean
    },
    membership: any
}

type SideBarItem = { id: number, url: string, name: string, icon: string }

type PlatformSpecificMeta = {
    brandImage: string,
    siteName: string,
    siteUrl: string
}
export interface Store {
    meta: {
        [App.CV]: PlatformSpecificMeta,
        [App.WINE_CODE]: PlatformSpecificMeta,
        appName: string,
        app: App,
        baseUri: string,
        gqlClient: App | null,
    },
    isAuthenticated: boolean,
    auth: AuthToken | void | null
    defaultUser: User
    profile: Profile,
    theme: {
        darkBg: boolean,
        color: string
    },
    sidebar: {
        selectedMenu: {
            id: number,
            url: string,
            name: string,
            icon: string,
            routeId: string,
            detailPage: {
                routeId: string
            }
        },
        apps: {
            menus: {
                CV: SideBarItem[],
                MUSIC_CODE: SideBarItem[],
            }
        }
        showingOffCanvas: boolean
    },
    notification: {
        text: string | null,
        type: string | null
    } | null,
}