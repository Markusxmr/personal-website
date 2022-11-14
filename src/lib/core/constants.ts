import { browser } from "$app/environment";
import type { App } from "./enums";

export const CONTEXT = {
    locale: Symbol("locale")
}
export const BASE_ROUTE = `apps`
export const DEFAULT_PROFILE_IMAGE = "/core/images/profile/profile.png";
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
export const IMAGE_PLACEHOLDER =
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fres-1.cloudinary.com%2Fsimpleview%2Fimage%2Fupload%2Fc_limit%2Cf_auto%2Ch_1200%2Cq_75%2Cw_1200%2Fv1%2Fclients%2Fhouston%2FFull_image_placeholder_8eaceb06-4b7a-4752-8715-457c8c91f1c0.jpg&f=1&nofb=1';
export const DEFAULT_PROFILE_IMAGE_LIST = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.salisburyut.com%2Fwp-content%2Fuploads%2F2020%2F09%2Favatar-1-scaled.jpeg&f=1&nofb=1";
export const DEFAULT_ALBUM_IMAGE = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.mos.cms.futurecdn.net%2FhJHjdbVKNhorF6aNu5p8kC-1200-80.jpg&f=1&nofb=1";
