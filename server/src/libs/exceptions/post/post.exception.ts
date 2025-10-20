import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionMessage } from "@/posts/domain/exception-message";

export class PostException extends HttpException {
    constructor(message: string, status: HttpStatus) {
        super(message, status);
    }
}

export class PostNotFound extends PostException {
    constructor() {
        super(ExceptionMessage.NOT_FOUND_POST, HttpStatus.NOT_FOUND);
    }
}
