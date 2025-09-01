import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreateUserCommand } from "@/users/application/commands/create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
    implements ICommandHandler<CreateUserCommand, void>
{
    async execute(command: CreateUserCommand) {
        console.log("여기가 호출 됩니다.", command);

        /**
         * repository 호출
         */
    }
}
