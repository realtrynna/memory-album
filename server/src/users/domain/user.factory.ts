import { EventPublisher } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { CreateUserCommand } from "@/users/application/commands/create-user.command";
import { User, UserProperties } from "@/users/domain/user";

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

    reconstitute(properties: UserProperties) {
        return this.eventPublisher.mergeObjectContext(new User(properties));
    }
}
