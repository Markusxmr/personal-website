import { browser } from "$app/environment";
import { connect } from "nats.ws";
import { errorHandler } from "../error";

export async function client() {
    const conn = await connect(
        {
            servers: [`${import.meta.env.VITE_NATS_WEBSOCKET}`]
        },
    );

    return conn;
}

export async function initNatsClient() {
    return client()
        .then(async (conn) => {
            return conn;
        })
}