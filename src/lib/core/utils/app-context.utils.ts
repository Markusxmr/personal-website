import { browser } from "$app/environment";
import { BASE_ROUTE } from "../constants";
import { App } from "../enums";
import { store } from "../../../stores/core";

export function app(appName: string) {
    return appName.toLowerCase().replace('_', '-')
}

export function setApplication(app: any) {
    if (browser) {
        localStorage.setItem("APPLICATION", app);
        store.update((state) => ({
            ...state,
            meta: {
                ...state.meta,
                app: app,
                baseUri: `${BASE_ROUTE}/${(app ?? App.MUSIC_CODE).toLowerCase().replace('_', '-')}`
            }
        }));
    }
}

export function getAppCtxByUrl() {
    if (browser) {
        const localhostHelper = (path: string) => host.includes(`localhost`) && href.includes(path);
        const host = window.location.host;
        const href = window.location.href;

        const admin = href.includes(`apps/admin`);
        const artcode = href.includes(`artcode.city`) || href.includes(`apps/art-code`);
        const markorendulicCv = href.includes(`apps/cv`);
        const markorendulicArtCode = href.includes(`apps/art-code`);
        const markorendulicMusicCode = host.includes(`markorendulic.com`) && href.includes(`apps/music-code`);
        const musiccode = href.includes(`musiccode.city`) || href.includes(`apps/music-code`);
        const winecode = href.includes(`winecode.city`) || href.includes(`apps/wine-code`);

        const adminLocalhost = localhostHelper(`apps/admin`);
        const artcodeLocalhost = localhostHelper(`apps/art-code`);
        const cvLocalhost = localhostHelper(`apps/cv`);
        const musicCodeLocalhost = localhostHelper(`apps/music-code`);
        const wineCodeLocalhost = localhostHelper(`apps/wine-code`);

        let app;
        if (artcode || artcodeLocalhost || markorendulicArtCode) {
            app = App.ART_CODE;
        } else if (admin || adminLocalhost) {
            app = App.ADMIN;
        } else if (markorendulicCv || cvLocalhost) {
            app = App.CV;
        } else if (musiccode || musicCodeLocalhost || markorendulicMusicCode) {
            app = App.MUSIC_CODE;
        } else if (winecode || wineCodeLocalhost) {
            app = App.WINE_CODE;
        } else {
            app = App.ART_CODE;
        }

        return app;
    }
}