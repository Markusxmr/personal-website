export { app, setApplication } from "./app-context.utils";

export function post(endpoint: any, data: any) {
    return fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem("access_token") ?? ""}`
        }
    }).then((r) => r.json());
}

export function get(endpoint: any) {
    return fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem("access_token") ?? ""}`
        }
    }).then((r) => r.json());
}