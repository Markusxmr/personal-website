import axios from "axios";
import { CMS_URL } from "$lib/core/config";
import { jwtApiKey } from "$lib/core/auth/auth.utils";
import { store } from "$stores/core";
import { get } from "svelte/store";
import { App } from "../enums";

function requestInterceptor(instance: any) {
    instance.interceptors.request.use((config: any) => {
        // store.global.update(state => ({ ...state, loading: true }));
        return config
    }, function (error: any) {
        // store.global.update(state => ({ ...state, loading: false }));
        return Promise.reject(error);
    });
}

function responseInterceptor(instance: any) {
    instance.interceptors.response.use((response: any) => {
        // store.global.update(state => ({ ...state, loading: false }));
        return response;
    }, function (error: any) {
        // store.global.update(state => ({ ...state, loading: false }));
        return Promise.reject(error);
    });
}

const baseHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const strapi = {
    axiosClient() {
        const JWT_API_KEY = jwtApiKey();
        const instance = axios.create({
            baseURL: `${CMS_URL}/api/`,
            headers: {
                ...baseHeaders,
                ...(JWT_API_KEY ? { authorization: `Bearer ${JWT_API_KEY}` } : null)
            },
            timeout: 15000,
        })

        requestInterceptor(instance);
        responseInterceptor(instance);

        return instance;
    },

    axiosClientPublic() {
        const instance = axios.create({
            baseURL: `${CMS_URL}/api/`,
            headers: {
                ...baseHeaders,
            },
            timeout: 15000,
        })

        requestInterceptor(instance);
        responseInterceptor(instance);

        return instance;
    },

    axiosClientUpload() {
        const JWT_API_KEY = get(store).meta.app === App.ART_CODE ? jwtApiKey() : "";
        const instance = axios.create({
            baseURL: `${CMS_URL}/api/`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                ...(JWT_API_KEY ? { authorization: `Bearer ${JWT_API_KEY}` } : null)
            },
            timeout: 15000,
        });

        requestInterceptor(instance);
        responseInterceptor(instance);
        return instance
    }
}

export const host = {
    axiosClient() {
        const JWT_API_KEY = get(store).meta.app === App.ART_CODE ? jwtApiKey() : "";
        const instance = axios.create({
            baseURL: `/`,
            headers: {
                ...baseHeaders,
                ...(JWT_API_KEY ? { authorization: `Bearer ${JWT_API_KEY}` } : null)
            },
            timeout: 15000,
        })

        requestInterceptor(instance);
        responseInterceptor(instance);

        return instance;
    },
}
