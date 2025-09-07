import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreateUserCommand } from "@/users/application/commands/create-user.command";
import { UserFactory } from "@/users/domain/user.factory";
import { PASSWORD_SERVICE_TOKEN } from "@libs/password/password.module";
import { PasswordService } from "@libs/password/password.service";
import { UserAlreadyExists } from "@libs/exceptions/user/user.exception";
import type { UserRepository } from "@/users/domain/user.repository";
import { InjectionToken } from "@/users/application/injection-token";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
    implements ICommandHandler<CreateUserCommand, void>
{
    constructor(
        @Inject(InjectionToken.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        /**
         * UserFactory 클래스를 provider로 등록했기 때문에 @Inject 불필요
         * 커스텀 provider(userClass, useValue, useFactory)를 사용하면 @Inject에 token
         */
        private readonly userFactory: UserFactory,
        @Inject(PASSWORD_SERVICE_TOKEN)
        private readonly passwordService: PasswordService,
    ) {}

    async execute(command: CreateUserCommand) {
        const existingUser = await this.userRepository.findUnique(
            command.email,
        );

        if (existingUser) {
            throw new UserAlreadyExists(existingUser.getEmail());
        }

        const user = this.userFactory.create({
            ...command,
            password: await this.passwordService.hash(command.password),
            birthday: new Date(command.birthday),
        });

        user.register();

        await this.userRepository.create(user);

        user.commit();

    }
}
