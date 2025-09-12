import { ApiTags } from "@nestjs/swagger";
import {
    Controller,
    HttpCode,
    HttpStatus,
    Req,
    UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedRoute } from "@nestia/core";

import type { LoginDto } from "@/auth/interface/dto/login.dto";
import { LoginCommand } from "@/auth/application/commands/login.command";
import { TokenValidate } from "@libs/exceptions/user/user.exception";
import { RefreshCommand } from "@/auth/application/commands/refresh.command";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(readonly commandBus: CommandBus) {}

    @TypedRoute.Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@TypedBody() loginDto: LoginDto) {
        const command = new LoginCommand(loginDto.email, loginDto.password);

        const { accessToken, refreshToken } =
            await this.commandBus.execute(command);

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
}
