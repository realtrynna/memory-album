import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { UserCreatedEvent } from "@/users/domain/events/user-created.event";

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
    implements IEventHandler<UserCreatedEvent>
{
    async handle(event: UserCreatedEvent) {}
}
