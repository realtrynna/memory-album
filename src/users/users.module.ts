import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { UsersController } from "@/users/interface/user.controller";
import { CreateUserHandler } from "@/users/application/commands/create-user.handler";
import { UserFactory } from "@/users/domain/user.factory";

const domain = [UserFactory]

@Module({
    imports: [CqrsModule.forRoot()],
    controllers: [UsersController],
    providers: [CreateUserHandler, UserFactory],
})
export class UsersModule {}
