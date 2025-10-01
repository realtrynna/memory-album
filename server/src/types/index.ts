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

export type FileExtension = "jpg" | "jpeg" | "png" | "mp4" | "webm";

export interface MediaFile {
    filename?: string | null;
    filetype?: string | null;
    extension?: FileExtension;
    size?: number | null;
    path?: string | null;
}

declare module "express" {
    export interface Request {
        file?: MediaFile;
    }
}
