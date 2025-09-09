import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { RefreshCommand } from "@/auth/application/commands/refresh.command";
import { AuthService } from "@/auth/application/auth.service";

@CommandHandler(RefreshCommand)
export class RefreshHandler implements ICommandHandler<RefreshCommand, void> {
    constructor(private readonly authService: AuthService) {}

    async execute({ refreshToken }: RefreshCommand) {
        await this.authService.refresh(refreshToken);
    }
}
