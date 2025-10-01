import { Controller, HttpStatus, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedRoute } from "@nestia/core";

import type { CreateUserDto } from "@/users/interface/dto/create-user.dto";
import { CreateUserCommand } from "@/users/application/commands/create-user.command";
import { UserExceptionFilter } from "@libs/exceptions/user/user.exception.filter";
import { responseWrap } from "@libs/response-wrap";
import { ResponseMap } from "@/constant";
import type { LoginSuccess } from "@/types";

export interface CreateUserCommandResult {
    email: string;
    accessToken: string;
    refreshToken: string;
}

@ApiTags("유저")
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

        const { email, accessToken, refreshToken } =
            (await this.commandBus.execute(command)) as LoginSuccess;

        ResponseMap.LOGIN_SUCCESS.message = "회원가입에 성공하였습니다.";

        return responseWrap(ResponseMap.LOGIN_SUCCESS, {
            email,
            accessToken,
            refreshToken,
        });
    }
}
