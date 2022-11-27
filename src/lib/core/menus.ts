import { BASE_ROUTE } from "./constants";

export const menus = {
    EMPTY: [
        {
            url: `/${BASE_ROUTE}/cv`,
            name: 'Home',
            icon: 'fa fa-home',
            id: `${BASE_ROUTE}/cv`,
            detailPage: {
                id: `${BASE_ROUTE}/cv`
            }
        },
    ],
    ADMIN: [
        {
            url: `/${BASE_ROUTE}/admin`,
            name: 'Home',
            icon: 'fa fa-home',
            id: `${BASE_ROUTE}/admin`,
            detailPage: {
                id: `${BASE_ROUTE}/admin`
            }
        },
        {
            url: `/${BASE_ROUTE}/admin/newsletter`,
            name: 'Newsletter',
            icon: 'fa fa-home',
            id: `${BASE_ROUTE}/admin/newsletter`,
            detailPage: {
                id: `${BASE_ROUTE}/admin/newsletter`
            }
        },
    ],
    ART_CODE: [
        {
            url: `/${BASE_ROUTE}/art-code`,
            name: 'Home',
            icon: 'fa fa-user',
            id: `${BASE_ROUTE}/art-code/contact`,
            detailPage: {
                id: `${BASE_ROUTE}/cv`
            }
        },
        {
            url: `/${BASE_ROUTE}/art-code/auction`,
            name: 'Auction',
            icon: 'fa fa-user',
            id: `${BASE_ROUTE}/art-code/auction`,
            detailPage: {
                id: `${BASE_ROUTE}/art-code`
            }
        },
        {
            url: `/${BASE_ROUTE}/art-code/explore`,
            name: 'Explore',
            icon: 'fa fa-user',
            id: `${BASE_ROUTE}/art-code/explore`,
            detailPage: {
                id: `${BASE_ROUTE}/art-code`
            }
        },
        {
            url: `/${BASE_ROUTE}/art-code/artists`,
            name: 'Artists',
            icon: 'fa fa-user',
            id: `${BASE_ROUTE}/art-code/artists`,
            detailPage: {
                id: `${BASE_ROUTE}/art-code`
            }
        },
        {
            url: `/${BASE_ROUTE}/art-code/events`,
            name: 'Events',
            icon: 'fa fa-user',
            id: `${BASE_ROUTE}/art-code/events`,
            detailPage: {
                id: `${BASE_ROUTE}/art-code`
            }
        },
    ],
    CV: [
        {
            url: `/${BASE_ROUTE}/cv`,
            name: 'Home',
            icon: 'fa fa-home',
            id: `${BASE_ROUTE}/cv`,
            detailPage: {
                id: `${BASE_ROUTE}/cv`
            }
        },
        {
            url: `/${BASE_ROUTE}/cv/about`,
            name: 'About',
            icon: 'fa fa-user',
            id: `${BASE_ROUTE}/cv/about`,
            detailPage: {
                id: `${BASE_ROUTE}/cv/about`
            }
        },
        {
            url: `/${BASE_ROUTE}/cv/resume`,
            name: 'Resume',
            icon: 'fa fa-cog',
            id: `${BASE_ROUTE}/cv/resume`,
            detailPage: {
                id: `${BASE_ROUTE}/cv/resume`
            }
        },
        {
            url: `/${BASE_ROUTE}/cv/diagrams`,
            name: 'Diagrams',
            icon: 'fa fa-briefcase',
            id: `${BASE_ROUTE}/cv/diagrams`,
            detailPage: {
                id: `${BASE_ROUTE}/cv/diagrams`
            }
        },
        {
            url: `/${BASE_ROUTE}/cv/blogs`,
            name: 'Blogs',
            icon: 'fa fa-briefcase',
            id: `${BASE_ROUTE}/cv/blogs`,
            detailPage: {
                id: `${BASE_ROUTE}/cv/blogs/[slug]`
            }
        },
    ],
    MUSIC_CODE: [
        {
            url: `/${BASE_ROUTE}/music-code`,
            name: 'Home',
            icon: 'fa fa-home',
            id: `${BASE_ROUTE}/music-code`,
            detailPage: {
                id: `${BASE_ROUTE}/music-code`
            }
        },
        {
            url: `/${BASE_ROUTE}/music-code/albums`,
            name: 'Albums',
            icon: 'fa fa-folder',
            id: `${BASE_ROUTE}/music-code/albums`,
            detailPage: {
                id: `${BASE_ROUTE}/music-code/albums/[id]`
            }
        },
        {
            url: `/${BASE_ROUTE}/music-code/artists`,
            name: 'Artists',
            icon: 'fa fa-users',
            id: `${BASE_ROUTE}/music-code/artists`,
            detailPage: {
                id: `${BASE_ROUTE}/music-code/artists/[id]`
            }
        },
        {
            url: `/${BASE_ROUTE}/music-code/studio`,
            name: 'Studio',
            icon: 'fa fa-volume-up',
            id: `${BASE_ROUTE}/music-codecv/studio`,
            detailPage: {
                id: `${BASE_ROUTE}/music-code/studio`
            }
        },
        {
            url: `/${BASE_ROUTE}/music-code/festivals`,
            name: 'Festivals',
            icon: 'fa fa-hand-o-up',
            id: `${BASE_ROUTE}/music-code/festivals`,
            detailPage: {
                id: `${BASE_ROUTE}/music-code/festivals/[id]`
            }
        },
        {
            url: `/${BASE_ROUTE}/music-code/about`,
            name: 'About',
            icon: 'fa fa-fort-awesome',
            id: `${BASE_ROUTE}/music-code/about`,
            detailPage: {
                id: `${BASE_ROUTE}/music-code/about`
            }
        },
        {
            url: `/${BASE_ROUTE}/music-code/platforms`,
            name: 'Platforms',
            icon: 'fa fa-globe',
            id: `${BASE_ROUTE}/music-code/platforms`,
            detailPage: {
                id: `${BASE_ROUTE}/music-code/platforms`
            }
        },
        {
            url: `/${BASE_ROUTE}/music-code/contact`,
            name: 'Contact',
            icon: 'fa fa-phone',
            id: `${BASE_ROUTE}/music-code/contact`,
            detailPage: {
                id: `${BASE_ROUTE}/music-code/contact`
            }
        }
    ],
    WINE_CODE: [
        {
            url: `/${BASE_ROUTE}/wine-code`,
            name: 'Home',
            icon: 'fa fa-user',
            id: `${BASE_ROUTE}/wine-code`,
            detailPage: {
                id: `${BASE_ROUTE}/wine-code`
            }
        },
        {
            url: `/${BASE_ROUTE}/wine-code/listings`,
            name: 'Explore',
            icon: 'fa fa-user',
            id: `${BASE_ROUTE}/wine-code/listings`,
            detailPage: {
                id: `${BASE_ROUTE}/wine-code/listings`
            }
        },
        {
            url: `/${BASE_ROUTE}/wine-code/plans`,
            name: 'Plans',
            icon: 'fa fa-user',
            id: `${BASE_ROUTE}/wine-code/plans`,
            detailPage: {
                id: `${BASE_ROUTE}/wine-code/plans`
            }
        },
        {
            url: `/${BASE_ROUTE}/wine-code/platforms`,
            name: 'Platforms',
            icon: 'fa fa-user',
            id: `${BASE_ROUTE}/wine-code/platforms`,
            detailPage: {
                id: `${BASE_ROUTE}/wine-code/platforms`
            }
        },
        // {
        //     url: `/${BASE_ROUTE}/wine-code/auth/signin`,
        //     name: 'Signin',
        //     icon: 'fa fa-user',
        //     id: `${BASE_ROUTE}/wine-code/auth/signin`,
        //     detailPage: {
        //         id: `${BASE_ROUTE}/wine-code/auth/signin`
        //     }
        // },
    ]
}