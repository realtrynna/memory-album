import type { Request } from "express";
import type { Algorithm } from "jsonwebtoken";

export interface JwtOptions {
    algorithm: Algorithm;
    secret: string;
    expiresIn: string;
}

export interface JwtPayload {
    id: number;
    email: string;
}

export interface LoginSuccess {
    email: string;
    accessToken: string;
    refreshToken: string;
}

export interface RequestUser extends Request {
    user: JwtPayload;
}
