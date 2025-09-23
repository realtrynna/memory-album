import { useApi } from "@/composables/useApi";
import type { ApiResponse, User } from "@/types";

export function useUserApi() {
    const { request } = useApi();

    const createUser = async (
        user: User,
    ): Promise<{
        isSuccess: boolean;
        data?: any;
        error?: string;
    }> => {
        try {
            const result = await request<
                Promise<ApiResponse<Pick<User, "email" | "accessToken" | "refreshToken">>>
            >({
                method: "POST",
                url: "/users",
                data: user,
            });

            return {
                isSuccess: true,
                data: result.data,
            };
        } catch (err) {
            return {
                isSuccess: false,
                error: err.response.data.message || "회원가입 실패",
            };
        }
    };

    return { createUser };
}
