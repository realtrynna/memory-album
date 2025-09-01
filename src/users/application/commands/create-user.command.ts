import { ICommand } from "@nestjs/cqrs";

export type Provider = "LOCAL" | "KAKAO";

export class CreateUserCommand implements ICommand {
    constructor(
        readonly email: string,
        readonly name: string,
        readonly password: string,
        readonly phone: string,
        readonly birthday: string,
        readonly provider: Provider,
    ) {}
}
