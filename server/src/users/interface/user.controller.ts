import { Controller, HttpStatus, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedRoute } from "@nestia/core";

import type { CreateUserDto } from "@/users/interface/dto/create-user.dto";
import { CreateUserCommand } from "@/users/application/commands/create-user.command";
import { UserExceptionFilter } from "@libs/exceptions/user/user.exception.filter";
import { responseWrap } from "@libs/response-wrap";

@ApiTags("Users")
@Controller("users")
@UseFilters(UserExceptionFilter)
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

        const { accessToken, refreshToken } =
            await this.commandBus.execute(command);

        /**
         * @TODO 공통 응답 Wrapper 구현
         */
        return {
            statusCode: HttpStatus.OK,
            data: {
                accessToken,
                refreshToken,
            },
        };
    }
}
