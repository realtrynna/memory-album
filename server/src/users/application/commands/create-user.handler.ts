import { forwardRef, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreateUserCommand } from "@/users/application/commands/create-user.command";
import { UserFactory } from "@/users/domain/user.factory";
import { PASSWORD_SERVICE_IMPLEMENT_TOKEN } from "@libs/password/password.module";
import type { PasswordService } from "@libs/password/password.module";
import { AlreadyExists } from "@libs/exceptions/user/user.exception";
import type { UserRepository } from "@/users/domain/user.repository";
import { InjectionToken } from "@/users/application/injection-token";
import { AuthService } from "@/auth/application/auth.service";
import type { LoginSuccess } from "@/types";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
    implements ICommandHandler<CreateUserCommand, LoginSuccess>
{
    constructor(
        @Inject(InjectionToken.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        /**
         * UserFactory 클래스를 provider로 등록했기 때문에 @Inject 불필요
         * 커스텀 provider(userClass, useValue, useFactory)를 사용하면 @Inject에 token
         */
        private readonly userFactory: UserFactory,
        @Inject(PASSWORD_SERVICE_IMPLEMENT_TOKEN)
        private readonly passwordService: PasswordService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    async execute(command: CreateUserCommand): Promise<LoginSuccess> {
        const email = command.email;

        const existingUser = await this.userRepository.findUnique(email);

        if (existingUser) {
            throw new AlreadyExists();
        }

        const user = this.userFactory.create({
            ...command,
            password: await this.passwordService.hash(command.password),
            birthday: new Date(command.birthday),
        });

        user.register();

        const created = await this.userRepository.create(user);

        user.commit();

        const tokenPayload = {
            id: created.getId,
            email,
        };

        const accessToken = this.authService.accessToken(tokenPayload);
        const refreshToken = this.authService.refreshToken(tokenPayload);

        return {
            email,
            accessToken,
            refreshToken,
        };
    }
}
