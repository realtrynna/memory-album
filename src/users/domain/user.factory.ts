import { EventPublisher } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { CreateUserCommand } from "@/users/application/commands/create-user.command";
import { User } from "@/users/domain/user";

export class UserFactory {
    @Inject(EventPublisher) eventPublisher: EventPublisher;

    create({
        email,
        name,
        password,
        phone,
        birthday,
        provider,
    }: CreateUserCommand) {
        return this.eventPublisher.mergeObjectContext(
            new User({
                email,
                name,
                password,
                phone,
                birthday,
                provider,
            }),
        );
    }
}
