import { useNuxtApp } from "nuxt/app";

export const useUserApi = () => {
    const nuxtApp = useNuxtApp();
    return nuxtApp.$api;
};
