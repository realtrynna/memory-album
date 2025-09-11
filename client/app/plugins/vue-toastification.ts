import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        position: "top-center",
        closeOnClick: true,
        timeout: 3000,
    });
});
