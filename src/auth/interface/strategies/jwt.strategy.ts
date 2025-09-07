import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "jwt",
            ignoreExpiration: false
        });
    }

    /**
     * repository를 주입받아 사용자 정보 반환 가능
     * 토큰 블랙 리스트 확인
     */
    async validate(payload: any) {
        return {
            email: "realtrynna@gmail.com",
        }
    }
}