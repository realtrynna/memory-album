import { ApiTags } from "@nestjs/swagger";
import {
    Controller,
    HttpCode,
    HttpStatus,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedQuery, TypedRoute } from "@nestia/core";

import type { LoginDto } from "@/auth/interface/dto/login.dto";
import { LoginCommand } from "@/auth/application/commands/login.command";
import { KakaoAuthGuard } from "@libs/guards/kakao-auth.guard";
import type { LoginSuccess } from "@/types";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(readonly commandBus: CommandBus) {}

    @TypedRoute.Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@TypedBody() loginDto: LoginDto) {
        const command = new LoginCommand(loginDto.email, loginDto.password);

        const { accessToken, refreshToken } = (await this.commandBus.execute(
            command,
        )) as LoginSuccess;

        return {
            statusCode: HttpStatus.OK,
            data: {
                accessToken,
                refreshToken,
            },
        };
    }

    @TypedRoute.Post("refresh")
    async refresh(@Req() req) {
        const refreshToken = req.headers["x-refresh-token"];

        console.log("here");
        // if (!refreshToken) {
        //     throw new TokenValidate();
        // }
        //
        // const command = new RefreshCommand(refreshToken);
        //
        // const { accessToken, refreshToken: newRefreshToken } =
        //     await this.commandBus.execute(command);
        //
        // return {
        //     statusCode: HttpStatus.OK,
        //     data: {
        //         accessToken,
        //         refreshToken: newRefreshToken,
        //     },
        // };
    }

    @TypedRoute.Get("callback")
    @UseGuards(KakaoAuthGuard)
    async callback(
        @Req() req,
        @TypedQuery()
        code: {
            code: string;
        },
    ) {
        console.log("코드", code);
        console.log("콜백 라우터", req.user);
        /**
         * 여기서 code를 받아 code를 기반으로 사용자 조회 api 요청
         */
    }

    @TypedRoute.Get("kakao")
    @UseGuards(KakaoAuthGuard)
    async kakao() {
        console.log("카카오 라우터 호출");
    }
}
