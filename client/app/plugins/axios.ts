import { defineNuxtPlugin } from "#app";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    // axios.defaults.withCredentials = true;

    const api = axios.create({
        baseURL: nuxtApp.$config.public.apiBase,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    nuxtApp.provide("api", api);
});
