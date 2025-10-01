import { Injectable } from "@nestjs/common";
import yaml from "js-yaml";
import { readFileSync } from "fs";
import { join } from "path";

import { NODE_ENV } from "@/constant";

@Injectable()
export class AppConfig {
    private readonly env: Record<string, any>;
    private readonly privateKey: string;
    private readonly publicKey: string;

    constructor() {
        this.env = yaml.load(
            readFileSync(join(process.cwd(), "env.yaml"), "utf8"),
        ) as Record<string, any>;
        this.privateKey = readFileSync(this.getKeyFilename("private"), "utf8");
        this.publicKey = readFileSync(this.getKeyFilename("public"), "utf8");

        if (!this.env[NODE_ENV] || !this.privateKey || !this.publicKey) {
            throw new Error("프로젝트 환경 변수 파일을 찾을 수 없습니다.");
        }
    }

    private getKeyFilename(key: string) {
        return join(process.cwd(), `${key}.key`);
    }

    getEnv() {
        return this.env[NODE_ENV];
    }

    getPrivateKey() {
        return this.privateKey;
    }

    getPublicKey() {
        return this.publicKey;
    }

    getS3() {
        const { region, accessKey, secretKey } = this.env[NODE_ENV].s3;

        return {
            region,
            accessKey,
            secretKey,
        };
    }
}
