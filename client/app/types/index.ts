type ProviderType = "LOCAL" | "KAKAO";

export interface User {
    email: string;
    name: string;
    password: string;
    phone: string;
    birthday: string;
    provider: ProviderType;
}
