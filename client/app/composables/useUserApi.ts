import { useApi } from "@/composables/useApi";
import type { User } from "@/types";

export function useUserApi() {
    const { request } = useApi();

    const createUser = (user: User) =>
        request({
            method: "POST",
            url: "/users",
            data: user,
        });

    const test = () => {
        request({
            method: "POST",
            url: "/auth/refresh",
        });
    };

    return { createUser, test };
}
