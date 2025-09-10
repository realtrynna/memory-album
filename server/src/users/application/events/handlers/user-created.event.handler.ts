import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { UserCreatedEvent } from "@/users/domain/events/user-created.event";

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
    implements IEventHandler<UserCreatedEvent>
{
    async handle(event: UserCreatedEvent) {
        console.log("생성된 사용자 정보", event);
    }
}
