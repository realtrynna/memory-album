import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from "@nestjs/common";
import type { Response } from "express";

import { UserException } from "@libs/exceptions/user/user.exception";

@Catch(UserException)
export class UserExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        // @TODO 응답 세분화
        return response.status(exception.getStatus()).json({
            statusCode: exception.getStatus(),
            message: exception.getResponse(),
        });
    }
}
