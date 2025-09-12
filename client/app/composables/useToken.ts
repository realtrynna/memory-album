import { useCookie } from "nuxt/app";

export function useToken() {
    const cookie = useCookie("x-refresh-token", { default: () => "realtrynna" });
    return cookie;
}
