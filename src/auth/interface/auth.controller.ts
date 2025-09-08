import { ApiTags } from "@nestjs/swagger";
import { Controller, Req, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedRoute } from "@nestia/core";

import type { LoginDto } from "@/auth/interface/dto/login.dto";
import { LoginCommand } from "@/auth/application/commands/login.command";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "@libs/guards/jwt-auth.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        readonly commandBus: CommandBus,
        private readonly jwt: JwtService,
    ) {}

    @TypedRoute.Post("login")
    async login(@TypedBody() loginDto: LoginDto) {
        const command = new LoginCommand(loginDto.email, loginDto.password);
    }
}
