import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreateUserCommand } from "@/users/application/commands/create-user.command";
import { UserFactory } from "@/users/domain/user.factory";
import { PASSWORD_SERVICE_TOKEN } from "@libs/password/password.module";
import { PasswordService } from "@libs/password/password.service";
import { UserAlreadyExists } from "@libs/exceptions/user/user.exception";
import type { UserRepository } from "@/users/domain/user.repository";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
    implements ICommandHandler<CreateUserCommand, void>
{
    constructor(
        @Inject("token")
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
        // const existingUser = await this.prisma.user.findUnique({
        //     where: {
        //         email: command.email,
        //     },
        // });
        //
        // if (existingUser) {
        //     throw new UserAlreadyExists(existingUser.email);
        // }

        const hashedPassword = await this.passwordService.hash(
            command.password,
        );

        const user = this.userFactory.create({
            ...command,
            password: hashedPassword,
            birthday: new Date(command.birthday),
        });

        user.register();

        const created = await this.userRepository.create(user);

        console.log("생성된 유저", created);

        // const created = await this.prisma.user.create({
        //     data: userInput,
        // });
        //
        // user.commit();
    }
}
