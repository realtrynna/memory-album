import { AggregateRoot } from "@nestjs/cqrs";
import type { Prisma } from "@prisma/client";

import { Provider } from "@/users/application/command/create-user.command";
import { UserCreatedEvent } from "@/users/domain/events/user-created.event";
import type { PasswordService } from "@libs/password/password.module";

export type UserProperties = Readonly<Prisma.UserUncheckedCreateInput>;

export class User extends AggregateRoot {
    private readonly id: number;
    private readonly email: string;
    private readonly name: string;
    private readonly password: string;
    private readonly phone: string;
    private readonly birthday: Date | string;
    private readonly provider: Provider;
    private readonly refreshToken: string | null;

    constructor(properties: UserProperties) {
        super();
        Object.assign(this, properties);
    }

    get getId() {
        return this.id;
    }

    get getEmail() {
        return this.email;
    }

    get getPassword() {
        return this.password;
    }

    get getRefreshToken() {
        return this.refreshToken;
    }

    register() {
        this.apply(new UserCreatedEvent(this.email));
    }

    async verifyPassword(
        rawPassword: string,
        passwordService: PasswordService,
    ): Promise<boolean> {
        return passwordService.verify(this.getPassword, rawPassword);
    }
}
