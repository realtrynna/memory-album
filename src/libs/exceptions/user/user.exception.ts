import { HttpException, HttpStatus } from "@nestjs/common";

export class UserException extends HttpException {
    constructor(message: string, status: HttpStatus) {
        super(message, status);
    }
}

export class UserAlreadyExists extends UserException {
    constructor(email: string) {
        super(
            `해당 이메일(${email})로 가입된 사용자가 이미 존재합니다. 다른 이메일을 사용해 주세요.`,
            HttpStatus.BAD_REQUEST,
        );
    }
}
