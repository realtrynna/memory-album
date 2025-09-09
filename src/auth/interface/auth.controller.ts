import { ApiTags } from "@nestjs/swagger";
import {
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Req,
    UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedRoute } from "@nestia/core";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt";

import type { LoginDto } from "@/auth/interface/dto/login.dto";
import { LoginCommand } from "@/auth/application/commands/login.command";
import { JwtAuthGuard } from "@libs/guards/jwt-auth.guard";
import { TokenValidate } from "@libs/exceptions/user/user.exception";
import type { UserRepository } from "@/users/domain/user.repository";
import { InjectionToken } from "@/users/application/injection-token";
import { RefreshCommand } from "@/auth/application/commands/refresh.command";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        readonly commandBus: CommandBus,
        private readonly jwtService: JwtService,
        @Inject(InjectionToken.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) {}

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

        if (!refreshToken) {
            throw new TokenValidate();
        }

        const command = new RefreshCommand(refreshToken);

        await this.commandBus.execute(command);
    }

    @TypedRoute.Get("test")
    @UseGuards(JwtAuthGuard)
    async test() {
        console.log("controller here");
    }
}
