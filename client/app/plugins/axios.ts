import { defineNuxtPlugin } from "#app";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    axios.defaults.withCredentials = true;

    const api = axios.create({
        baseURL: nuxtApp.$config.public.apiBase,
        headers: {
            "Content-Type": "application/json",
            Cookie: "name=value;",
        },
    });

    nuxtApp.provide("api", api);
});
