import { strapi } from "$lib/core/clients/axios.client";
import API from "$lib/core/enums/api.enum";
import { errorHandler } from "$lib/core/error";
import { jwtApiKey } from "$lib/core/auth/auth.utils";
import { queryParams } from "$lib/core/utils/query.utils";
import { GQL_DeleteUserMembership, GQL_InsertUserMembershipOne, GQL_UserProfile, type MembershipFields$data } from "$houdini";
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

export async function insertApiMembership(event: any, membership: MembershipFields$data) {
    console.log({
        authorizer_id: membership?.metadata?.authorizer_id,
        profile_id: membership?.metadata?.profile_id,
    });
    const metadata = membership?.metadata;
    const profiles = await GQL_UserProfile.fetch({
        event,
        variables: {
            where: {
                authorizer_id: {
                    _eq: metadata?.authorizer_id
                }
            }
        }
    });
    console.log(profiles);

    const profile = profiles?.data?.user_profile?.[0];

    if (!profile) {
        throw new Error("Profile not found");
    }

    const response = await GQL_InsertUserMembershipOne.mutate({
        object: {
            code: metadata?.code,
            price: metadata?.price,
            name: membership?.name,
            status: membership?.status,
            subscription: membership?.subscription,
            profile_id: profile?.profile_id,
        }
    })
        .catch(error => {
            console.log(error);
        });

    return response
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

export function deleteApiMembership(membership: any) {
    return GQL_DeleteUserMembership.mutate({
        where: {
            subscription: {
                _eq: membership?.subscription
            }
        }
    })
        .catch(error => {
            console.log(error);
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