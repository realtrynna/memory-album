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
import { AuthService } from "@/auth/application/auth.service";
import type { LoginSuccess } from "@/types";

@CommandHandler(LoginCommand)
export class LoginHandler
    implements ICommandHandler<LoginCommand, LoginSuccess>
{
    constructor(
        @Inject(InjectionToken.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(PASSWORD_SERVICE_IMPLEMENT_TOKEN)
        private readonly passwordService: PasswordService,
        private readonly authService: AuthService,
    ) {}

    async execute(command: LoginCommand) {
        const email = command.email;

        const user = await this.userRepository.findUnique(email);

        if (!user) {
            throw new NotFound();
        }

        const isVerify = await user.verifyPassword(
            command.password,
            this.passwordService,
        );

        if (!isVerify) {
            throw new PasswordNotMatched();
        }

        const tokenPayload = {
            id: user.getId,
            email,
        };

        const accessToken = this.authService.accessToken(tokenPayload);
        const refreshToken = this.authService.refreshToken(tokenPayload);

        await this.userRepository.updateRefreshToken(email, refreshToken);

        return {
            email,
            accessToken,
            refreshToken,
        };
    }
}
