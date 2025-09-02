import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreateUserCommand } from "@/users/application/commands/create-user.command";
import { PrismaService } from "@libs/db/prisma.service";
import { Inject } from "@nestjs/common";
import { UserFactory } from "@/users/domain/user.factory";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
    implements ICommandHandler<CreateUserCommand, void>
{
    constructor(
        private readonly prisma: PrismaService,
        @Inject() private readonly userFactory: UserFactory
    ) {
    }

    async execute(command: CreateUserCommand) {
        console.log("here", command);

        // this.userFactory.create();
    }
}
