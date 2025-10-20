import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { GetAlbumDetailQuery } from "@/albums/application/query/get-album-detail.query";
import { InjectionToken } from "@/albums/application/injection-token";
import type { AlbumRepository } from "@/albums/domain/album.repository";
import { AlbumNotFound } from "@libs/exceptions/album/album.exception";
import { GetAlbumDetailResult } from "@/albums/application/query/get-album-detail.result";

@QueryHandler(GetAlbumDetailQuery)
export class GetAlbumDetailHandler
    implements IQueryHandler<GetAlbumDetailQuery, GetAlbumDetailResult>
{
    constructor(
        @Inject(InjectionToken.ALBUM_REPOSITORY)
        private readonly albumRepository: AlbumRepository,
    ) {}

    async execute(command: GetAlbumDetailQuery): Promise<GetAlbumDetailResult> {
        const album = await this.albumRepository.findUniqueByAlbumId(
            command.albumId,
        );

        if (!album) {
            throw new AlbumNotFound();
        }

        return GetAlbumDetailResult.from(album);
    }
}
