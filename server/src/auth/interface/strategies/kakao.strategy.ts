import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") {
    constructor() {
        super({
            clientID: "1abf02fef343ccb7bec2c4e895febaba",
            clientSecret: "2GaHGKIeZQzl9UXk59wYLOk8XARGmwwQ",
            callbackURL: "http://192.168.2.199:4000/api/auth/callback",
        });
    }

    validate(accessToken, refreshToken, profile) {
        console.log("a 토큰", accessToken);
        console.log("r 토큰", refreshToken);
        console.log("프로필", profile);

        return {
            id: profile.id,
            nickname: profile.displayName,
            accessToken,
        };
    }
}
