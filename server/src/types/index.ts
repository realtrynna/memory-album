import type { Request } from "express";
import type { Algorithm } from "jsonwebtoken";
import { tags } from "typia";

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

export interface ImageFile {
    filename: string & tags.MinLength<1>;
    savedFilename: string & tags.MinLength<1>;
    extension: FileExtension;
    size: number & tags.Minimum<1>;
    path: string & tags.MinLength<1>;
    filetype?: string & tags.MinLength<1>;
    createdAt?: string;
    updatedAt?: string;
}

export type VideoFile = ImageFile & { duration: number; thumbnail: string };

declare module "express" {
    export interface Request {
        file: ImageFile;
        user: JwtPayload;
    }
}
