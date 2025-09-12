import { useNuxtApp } from "nuxt/app";

export function useApi() {
    const nuxtApp = useNuxtApp();
    const api = nuxtApp.$api;

    const request = async <T>(param): Promise<T> => {
        try {
            const response = await api.request(param);

            return response.data;
        } catch (err) {
            throw err;
        }
    };

    return {
        request,
    };
}
