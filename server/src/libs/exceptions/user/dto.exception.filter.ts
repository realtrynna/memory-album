import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
} from "@nestjs/common";
import type { Response } from "express";

type DtoValidationError = Array<{
    path: string;
    expected: string;
    value: string;
}>;

@Catch(BadRequestException)
export class DtoExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        console.log("예외", exception.getResponse()["message"]);

        const exceptionList = {
            status: exception.getStatus(),
            response: exception.getResponse(),
        };
        let errorList: DtoValidationError = [];

        if (this.isDtoError(exceptionList.response)) {
            errorList = exceptionList.response.errors;
        }

        return res.status(exceptionList.status).json({
            statusCode: exceptionList.status,
            message: "요청값의 형식이 올바르지 않습니다.",
            cause:
                this.errorExtraction(errorList).length === 0
                    ? "요청 본문의 형식은 application/json이어야 합니다."
                    : this.errorExtraction(errorList),
        });
    }

    private errorExtraction(errorList: DtoValidationError) {
        return errorList.map((error) => {
            return {
                field: error.path,
                expected: error.expected,
                value: error.value,
            };
        });
    }

    private isDtoError(
        response: unknown,
    ): response is { errors: DtoValidationError } {
        return (
            typeof response === "object" &&
            response !== null &&
            "errors" in response
        );
    }
}
