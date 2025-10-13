import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionMessage } from "@/albums/domain/exception-message";

export class AlbumException extends HttpException {
    constructor(message: string, status: HttpStatus) {
        super(message, status);
    }
}

export class AlbumNotFound extends AlbumException {
    constructor() {
        super(ExceptionMessage.NOT_FOUND_ALBUM, HttpStatus.NOT_FOUND);
    }
}
