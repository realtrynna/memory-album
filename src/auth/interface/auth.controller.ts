import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedRoute } from "@nestia/core";

import type { LoginDto } from "@/auth/interface/dto/login.dto";
import { LoginCommand } from "@/auth/application/commands/login.command";
import { JwtService } from "@nestjs/jwt";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        readonly commandBus: CommandBus,
        private readonly jwtService: JwtService
        ) {
    }

    @TypedRoute.Post("login")
    async login(@TypedBody() loginDto: LoginDto) {
        const command = new LoginCommand(
            loginDto.email,
            loginDto.password
        );

        const result = await this.commandBus.execute(command);

        console.log("리턴값", result)
    }
}