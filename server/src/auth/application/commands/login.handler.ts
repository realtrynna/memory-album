import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { LoginCommand } from "@/auth/application/commands/login.command";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "@/users/application/injection-token";
import type { UserRepository } from "@/users/domain/user.repository";
import {
    NotFound,
    PasswordNotMatched,
} from "@libs/exceptions/user/user.exception";
import { PASSWORD_SERVICE_IMPLEMENT_TOKEN } from "@libs/password/password.module";
import type { PasswordService } from "@libs/password/password.module";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "@/auth/application/auth.service";

@CommandHandler(LoginCommand)
export class LoginHandler
    implements
        ICommandHandler<
            LoginCommand,
            {
                accessToken: string;
                refreshToken: string;
            }
        >
{
    constructor(
        @Inject(InjectionToken.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(PASSWORD_SERVICE_IMPLEMENT_TOKEN)
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService,
        private readonly authService: AuthService,
    ) {}

    async execute(command: LoginCommand) {
        const user = await this.userRepository.findUnique(command.email);

        if (!user) {
            throw new NotFound();
        }

        const isVerify = await this.passwordService.verify(
            user.getPassword,
            command.password,
        );

        if (!isVerify) {
            throw new PasswordNotMatched();
        }

        const tokenPayload = {
            email: command.email,
        };

        const accessToken = this.authService.accessToken(tokenPayload);
        const refreshToken = this.authService.refreshToken(tokenPayload);

        await this.userRepository.updateRefreshToken(
            command.email,
            refreshToken,
        );

        return {
            accessToken,
            refreshToken,
        };
    }
}
