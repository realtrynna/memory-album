import { defineNuxtPlugin } from "#app";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const api = axios.create({
        baseURL: nuxtApp.$config.public.apiBase,
    });

    nuxtApp.provide("api", api);
});
