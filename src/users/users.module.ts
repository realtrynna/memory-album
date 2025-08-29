import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { UsersController } from "@/users/interface/user.controller";
import { CreateUserHandler } from "@/users/application/commands/create-user.handler";

@Module({
    imports: [CqrsModule.forRoot()],
    controllers: [UsersController],
    providers: [CreateUserHandler],
})
export class UsersModule {}
