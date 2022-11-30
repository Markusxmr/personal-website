import { browser } from "$app/environment";
import { connect } from "nats.ws";
import { errorHandler } from "./error";

export async function client() {
    const conn = await connect(
        {
            // servers: [ import.meta.env.VITE_NATS ?? "" ],
            servers: [`${import.meta.env.VITE_NATS_WEBSOCKET}:9222`]
        },
    );

    return conn;
}

export async function initNatsClient() {
    return client()
        .then(async (conn) => {
            if (browser) {
                window.nc = conn;
            }

            return conn;
        })
        .catch(errorHandler);
}