import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const accessToken = ref<string | null>(null);
    const refreshToken = ref<string | null>(null);

    watch(accessToken, (val) => {
        console.log("와치 밸류", val);
    });

    const setToken = (token) => {
        accessToken.value = token;
    };

    return {
        accessToken,
        setToken,
    };
});
