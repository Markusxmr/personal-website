import { strapi } from "$lib/core/axios.client";
import API from "$lib/core/enums/api.enum";
import { errorHandler } from "$lib/core/error";
import { queryParams } from "$lib/core/utils/query.utils";

export function getStrapiCMSUserByStripeId(stripeId: any) {
    return strapi.axiosClient()
        .get(API.STRAPI.USERS + `?${queryParams({ populate: "*" })}`)
        .then(({ data }) => {
            return data;
        })
        .catch(errorHandler);
}

export function getStrapiCMSUsers() {
    return strapi.axiosClient()
        .get(API.STRAPI.USERS + `?${queryParams({ populate: "*" })}`)
        .then(({ data }) => {
            return data;
        })
        .catch(errorHandler);
}