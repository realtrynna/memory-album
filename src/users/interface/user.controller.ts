import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedRoute } from "@nestia/core";

import type { CreateUserDto } from "@/users/interface/dto/create-user.dto";
import { CreateUserCommand } from "@/users/application/commands/create-user.command";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(readonly commandBus: CommandBus) {}

    @TypedRoute.Post()
    async createUser(@TypedBody() createUserDto: CreateUserDto) {
        const command = new CreateUserCommand(
            createUserDto.email,
            createUserDto.name,
            createUserDto.password,
            createUserDto.phone,
            createUserDto.birthday,
            "LOCAL",
        );

        await this.commandBus.execute(command);
    }
}
