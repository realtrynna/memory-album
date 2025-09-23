type ProviderType = "LOCAL" | "KAKAO";

export interface ApiResponse<T> {
    statusCode: number;
    data: T;
}

export interface User {
    email: string;
    name: string;
    password: string;
    phone: string;
    birthday: string;
    provider: ProviderType;
    accessToken?: string;
    refreshToken?: string;
}
