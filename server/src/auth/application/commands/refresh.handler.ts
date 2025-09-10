import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { RefreshCommand } from "@/auth/application/commands/refresh.command";
import { AuthService } from "@/auth/application/auth.service";

@CommandHandler(RefreshCommand)
export class RefreshHandler
    implements
        ICommandHandler<
            RefreshCommand,
            {
                accessToken: string;
                refreshToken: string;
            }
        >
{
    constructor(private readonly authService: AuthService) {}

    async execute({ refreshToken }: RefreshCommand) {
        return await this.authService.refresh(refreshToken);
    }
}
