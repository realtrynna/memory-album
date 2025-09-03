import { IEvent } from "@nestjs/cqrs";

/**
 * Event handler에서 사용할 객체
 */
export class UserCreatedEvent implements IEvent {
    constructor(email: string) {}
}
