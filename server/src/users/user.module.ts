import { forwardRef, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { UsersController } from "@/users/interface/user.controller";
import { CreateUserHandler } from "@/users/application/commands/create-user.handler";
import { UserFactory } from "@/users/domain/user.factory";
import { PasswordModule } from "@libs/password/password.module";
import { UserCreatedEventHandler } from "@/users/application/events/handlers/user-created.event.handler";
import { UserRepositoryImplement } from "@/users/infrastructure/user.repository.implement";
import { InjectionToken } from "@/users/application/injection-token";
import { AuthModule } from "@/auth/auth.module";

const application = [CreateUserHandler, UserCreatedEventHandler];
const domain = [UserFactory];
const infrastructure = [
    {
        provide: InjectionToken.USER_REPOSITORY,
        useClass: UserRepositoryImplement,
    },
];

@Module({
    imports: [CqrsModule, PasswordModule, forwardRef(() => AuthModule)],
    controllers: [UsersController],
    providers: [...application, ...domain, ...infrastructure],
    exports: [InjectionToken.USER_REPOSITORY],
})
export class UserModule {}
