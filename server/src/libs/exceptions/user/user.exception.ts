import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionMessage } from "@/users/domain/exception-message";

export class UserException extends HttpException {
    constructor(message: string, status: HttpStatus) {
        super(message, status);
    }
}

export class AlreadyExists extends UserException {
    constructor() {
        super(ExceptionMessage.ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }
}

export class TokenExpired extends UserException {
    constructor() {
        super(ExceptionMessage.TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
    }
}

export class TokenValidate extends UserException {
    constructor() {
        super(ExceptionMessage.TOKEN_VALIDATE, HttpStatus.UNAUTHORIZED);
    }
}

export class NotFound extends UserException {
    constructor() {
        super(ExceptionMessage.NOT_FOUND, HttpStatus.UNAUTHORIZED);
    }
}

export class PasswordNotMatched extends UserException {
    constructor() {
        super(ExceptionMessage.PASSWORD_NOT_MATCHED, HttpStatus.UNAUTHORIZED);
    }
}
