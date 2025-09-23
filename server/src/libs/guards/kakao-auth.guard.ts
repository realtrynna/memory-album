import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class KakaoAuthGuard extends AuthGuard("kakao") {
    constructor() {
        super();
    }

    handleRequest(err, user, info) {
        console.log("에러", err);
        console.log("유저", user);
        console.log("정보", info);

        return user;
    }
}
