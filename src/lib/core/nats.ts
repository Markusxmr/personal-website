import { browser } from "$app/environment";
import { connect } from "nats.ws";
import { errorHandler } from "./error";

export async function client() {
    const conn = await connect(
        {
            servers: [
                import.meta.env.VITE_NATS ?? ""
            ],
        },
    );

    return conn;
}

export async function startNatsClient() {
    return client()
        .then(async (conn) => {
            if (browser) {
                window.nc = conn;
            }

            return conn;
        })
        .catch(errorHandler);
}