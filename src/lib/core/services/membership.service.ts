import {
    GQL_UpdateUserMembership,
    GQL_DeleteUserMembership,
    GQL_InsertUserMembershipOne,
    GQL_UserProfile,
    GQL_UserMembership
} from "$houdini";

export async function findMembership({ variables: { platform, authorizer_id } }) {
    return GQL_UserMembership.fetch({
        variables: {
            where: {
                platform: {
                    _eq: platform
                },
                profile: {
                    authorizer_id: {
                        _eq: authorizer_id
                    },
                },
            }
        }
    })?.then(res => {
        return res?.data?.user_membership?.[0]
    });
}

export async function insertApiMembership(event: any, membership: any) {
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

    const profile = profiles?.data?.user_profile?.[0];

    if (!profile) {
        throw new Error("Profile not found");
    }
    const platform = metadata?.platform
    const email = profile?.email
    const userMembershipResponse = await GQL_UserMembership.fetch({
        event,
        variables: {
            where: {
                platform: {
                    _eq: platform
                },
                profile: {
                    email: {
                        _eq: email
                    },
                },
            }
        }
    })
    const user_membership = userMembershipResponse?.data?.user_membership?.[0];
    if (!user_membership) {
        return GQL_InsertUserMembershipOne.mutate({
            object: {
                code: metadata?.code,
                platform: metadata?.platform,
                price: membership?.price,
                name: membership?.name,
                status: membership?.status,
                subscription: membership?.subscription,
                profile_id: profile?.profile_id,
            }
        })
            .catch(error => {
                console.log(error);
            });
    } else {
        return GQL_UpdateUserMembership.mutate({
            pk_columns: {
                membership_id: user_membership?.membership_id
            },
            _set: {
                code: metadata?.code,
                platform: metadata?.platform,
                price: membership?.price,
                name: membership?.name,
                status: membership?.status,
                subscription: membership?.subscription,
                profile_id: profile?.profile_id,
            }
        })
            .catch(error => {
                console.log(error);
            });
    }

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