import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NestMiddleware,
} from "@nestjs/common";
import busboy, { FileInfo } from "busboy";
import type { Request, Response } from "express";
import { getVideoDurationInSeconds } from "get-video-duration";
import {
    PassThrough,
    Transform,
    TransformCallback,
    Writable,
} from "node:stream";
import { Readable } from "stream";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import type { FileExtension } from "@/types";
import { AppConfig } from "@/config/app-config";

@Injectable()
export class MediaFileParseMiddleware implements NestMiddleware {
    private readonly videoMimeTypeList = ["video/webm", "video/mp4"];
    private readonly imageMimeTypeList = ["image/png", "image/jpeg"];

    constructor(private readonly appConfig: AppConfig) {}

    use(req: Request, res: Response, next: (error?: object) => void) {
        const bb = busboy({
            headers: req.headers,
        });

        bb.on("file", async (fieldname, file, info) => {
            if (fieldname !== "file") {
                throw new BadRequestException("업로드 필드명을 확인해 주세요.");
            }

            try {
                const result = await this.upload(file, info);

                // if (!req.file) req.file = {};

                req.file = {
                    filename: info.filename,
                    filetype: result.filetype,
                    extension: result.extension as FileExtension,
                    size: result.size,
                    path: result.path as string,
                };

                next();
            } catch (err) {
                /**
                 * @TODO logging
                 */
                console.log("catch error");
                next(err);
            }
        });

        bb.on("error", (err: unknown) => {
            throw new InternalServerErrorException(err);
        });

        req.pipe(bb);
    }

    private getFileInfo(file: FileInfo) {
        const temp = file.filename.split(".");
        temp.pop();
        const filename = temp.join(".");
        const filetype = file.mimeType.split("/")[0];
        const extension = file.filename.split(".").pop();
        const folder = filetype === "image" ? "image" : "video";
        const savedFilename =
            folder + "/" + Date.now() + "_" + filename + "." + extension;

        return {
            filename,
            savedFilename,
            filetype,
            mimeType: file.mimeType,
            extension,
        };
    }

    private async upload(stream: Readable, info: FileInfo) {
        let size = 0;

        const pass = new PassThrough();

        pass.on("data", (chunk) => (size += chunk.length));

        stream.pipe(pass);

        const fileInfo = this.getFileInfo(info);

        const client = new S3Client({
            region: this.appConfig.getS3().region,
            credentials: {
                accessKeyId: this.appConfig.getS3().accessKey,
                secretAccessKey: this.appConfig.getS3().secretKey,
            },
        });
        const upload = await new Upload({
            client,
            params: {
                Bucket: "dev-know",
                Key: fileInfo.savedFilename,
                Body: pass,
                ContentType: fileInfo.mimeType,
            },
        }).done();

        return {
            path: upload.Key,
            size,
            filetype: fileInfo.filetype,
            extension: fileInfo.extension,
        };
    }
}
