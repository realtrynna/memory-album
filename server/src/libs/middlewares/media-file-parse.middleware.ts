import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NestMiddleware,
} from "@nestjs/common";
import busboy from "busboy";
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
                const result = await this.upload(file);

                const extension = info.filename.split(".");

                if (!req.file) req.file = {};

                req.file.filename = info.filename;
                req.file.filetype = this.getFiletype(info.mimeType);
                req.file.extension = extension[
                    extension.length - 1
                ] as FileExtension;
                req.file.size = result.size;
                req.file.path = result.path;

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

    private getFiletype(mimeType: string): "image" | "video" | "unknown" {
        if (this.imageMimeTypeList.includes(mimeType)) {
            return "image";
        }

        if (this.videoMimeTypeList.includes(mimeType)) {
            return "video";
        }

        return "unknown";
    }

    private async upload(stream: Readable) {
        let size = 0;

        const pass = new PassThrough();

        pass.on("data", (chunk) => (size += chunk.length));

        stream.pipe(pass);

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
                Key: "uploads/sample.mp4",
                Body: pass,
                ContentType: "video/mp4",
            },
        }).done();

        return {
            path: upload.Key,
            size,
        };
    }
}
