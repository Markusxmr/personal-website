import { strapi } from "$lib/core/clients/axios.client";
import API from "$lib/core/enums/api.enum";
import { jwtApiKey } from "$lib/core/auth/auth.utils";
import { queryParams } from "$lib/core/utils/query.utils";
import axios from "axios";
import { CMS_URL } from "../config";

export async function insertStrapiCMSMembership(membership: any) {
    return axios.post(`${CMS_URL}/api/` + API.STRAPI.MEMBERSHIPS + `/addMembership?${queryParams({ populate: "*" })}`, {
        headers: {
            authorization: `Bearer ${process.env.ACCESS_TOKEN_READ_WRITE}`
        },
        membership
    })
        .catch(err => {
            console.log("insertStrapiCMSMembership error: ", err?.message)
        });
}

export function findStrapiCMSMembership(membership: any) {
    return strapi.axiosClient()
        .post(API.STRAPI.MEMBERSHIPS + `/findMembership?${queryParams({ populate: "*" })}`,
            { membership })
        .then(({ data }) => {
            return { data };
        })
        .catch(error => {
            console.log(error);
        });
}

export function deleteStrapiCMSMembership(membership: any) {
    return axios.post(`${CMS_URL}/api/` + API.STRAPI.MEMBERSHIPS + `/deleteMembership?${queryParams({ populate: "*" })}`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${process.env.ACCESS_TOKEN_READ_WRITE}`
        },
        membership
    })
        .catch(error => {
            console.log("deleteStrapiCMSMembership error: ", error?.message);
        });
}

export async function getStrapiCMSMembership({ filters }: any = null) {
    if (!jwtApiKey()) return Promise.resolve(null);

    return strapi.axiosClient()
        .post(API.STRAPI.MEMBERSHIPS + `/getMembership` + `?${queryParams({ filters })}`)
        .then(({ data }) => {
            return { data };
        })
        .catch(error => {
            console.log(error);
        });
}