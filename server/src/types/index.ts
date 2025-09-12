import type { Algorithm } from "jsonwebtoken";

export interface JwtOptions {
    algorithm: Algorithm;
    secret: string;
    expiresIn: string;
}

export interface JwtPayload {
    email: string;
}

export interface LoginSuccess {
    accessToken: string;
    refreshToken: string;
}
