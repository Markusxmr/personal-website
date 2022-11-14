import * as qs from "qs";

export const queryParams = (data) => qs.stringify(
    {
        ...data
    },
    {
        encodeValuesOnly: true,
    }
)
