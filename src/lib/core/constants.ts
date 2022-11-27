import { browser } from "$app/environment";
import type { App } from "./enums";

export const CONTEXT = {
    locale: Symbol("locale")
}
export const BASE_ROUTE = `apps`
export const IMAGE_PLACEHOLDER = '/core/images/image-placeholder.jpg';
export const DEFAULT_PROFILE_IMAGE = "/core/images/profile/profile.png";
export const DEFAULT_ALBUM_IMAGE = "/music-code/images/default-album-image.jpg";
export const ART_CODE_PRICING_PLAN = "ART_CODE";
export const DEFAULT_LOCALE = "en";
export const HREF_VOID = 'javascript:void(0)';
export const APPLICATION = (): App => {
    if (browser) {
        return (localStorage.getItem("APPLICATION") as App) ?? ""
    } else {
        return import.meta.env.VITE_APPLICATION ?? ""
    }
};
export const HASURA_REST_ENDPOINT = import.meta.env.VITE_HASURA_REST_ENDPOINT;
export const APPLICATION_SLUG = APPLICATION()?.toLowerCase()?.replace('_', '-') ?? "core";

