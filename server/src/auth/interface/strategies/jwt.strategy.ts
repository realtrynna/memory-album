import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { AppConfig } from "@/config/app-config";
import type { JwtPayload } from "@/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private readonly appConfig: AppConfig) {
        super({
            /**
             * Request header에 token이 올바른 형식인지 검사
             */
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: appConfig.getPublicKey(),
            ignoreExpiration: false,
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}
