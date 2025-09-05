import { AggregateRoot } from "@nestjs/cqrs";
import type { Prisma } from "@prisma/client";

import { Provider } from "@/users/application/commands/create-user.command";
import { UserCreatedEvent } from "@/users/domain/events/user-created.event";
import { PasswordService } from "@libs/password/password.service";

export type UserProperties = Readonly<Prisma.UserCreateInput>;

export class User extends AggregateRoot {
    private readonly email: string;
    private readonly name: string;
    private password: string;
    private readonly phone: string;
    private readonly birthday: Date | string;
    private readonly provider: Provider;

    constructor(properties: UserProperties) {
        super();
        Object.assign(this, properties);
    }

    getEmail() {
        return this.email;
    }

    async setPassword(password: string, passwordService: PasswordService) {
        this.password = await passwordService.hash(password);
        this.password = await passwordService.hash(password);
    }

    register() {
        this.apply(new UserCreatedEvent(this.email));
    }
}
