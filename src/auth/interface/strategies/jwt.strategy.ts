import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { AppConfig } from "@/config/app-config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private readonly appConfig: AppConfig) {
        super({
            /**
             * Request header에 token이 올바른 형식인지 검사
             */
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: appConfig.getPublicKey(),
            ignoreExpiration: true,
        });
    }

    /**
     * repository를 주입받아 사용자 정보 반환 가능
     * 토큰 블랙 리스트 확인
     */
    validate(payload: any) {
        return {
            email: payload.email,
        };
    }
}
