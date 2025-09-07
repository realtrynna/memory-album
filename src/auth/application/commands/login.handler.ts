import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { LoginCommand } from "@/auth/application/commands/login.command";

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, string> {
    constructor() {
    }

    async execute(command: LoginCommand) {
        console.log(command);

        return await "hello?";
    }
}