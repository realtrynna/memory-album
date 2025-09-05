import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from "@nestjs/common";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientRustPanicError,
    PrismaClientInitializationError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import type { Response } from "express";

@Catch(
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientRustPanicError,
    PrismaClientInitializationError,
    PrismaClientValidationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        // @TODO 응답 세분화
        return response.status(500).json({
            statusCode: 500,
            message: exception.message,
            ...(exception.meta && { cause: exception.meta }),
        });
    }
}
