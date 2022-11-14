import { strapi } from "$lib/apps/art-code/axios.client";
import API from "$lib/apps/art-code/enums/api.enum";
import { errorHandler } from "$lib/core/error";
import { jwtApiKey } from "$lib/apps/art-code/utils/auth.utils";
import { queryParams } from "$lib/core/utils/query.utils";

export function addMembership(membership: any) {
    return strapi.axiosClient()
        .post(API.STRAPI.MEMBERSHIPS + `/addMembership?${queryParams({ populate: "*" })}`,
            { membership })
        .then(({ data }) => {
            return { data };
        })
        .catch(errorHandler);
}

export function findMembership(membership: any) {
    return strapi.axiosClient()
        .post(API.STRAPI.MEMBERSHIPS + `/findMembership?${queryParams({ populate: "*" })}`,
            { membership })
        .then(({ data }) => {
            return { data };
        })
        .catch(errorHandler);
}

export function deleteMembership(membership: any) {
    return strapi.axiosClient()
        .post(API.STRAPI.MEMBERSHIPS + `/deleteMembership?${queryParams({ populate: "*" })}`, { membership })
        .then(({ data }) => {
            return { data };
        })
        .catch(errorHandler);
}

export async function getMembership({ filters }: any = null) {
    if (!jwtApiKey()) return Promise.resolve(null);

    return strapi.axiosClient()
        .post(API.STRAPI.MEMBERSHIPS + `/getMembership` + `?${queryParams({ filters })}`)
        .then(({ data }) => {
            return { data };
        })
        .catch(errorHandler);
}