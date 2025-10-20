import { IQuery } from "@nestjs/cqrs";

export class GetAlbumDetailQuery implements IQuery {
    constructor(readonly albumId: number) {}
}
