import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { InjectionToken } from "@/albums/application/injection-token";
import type { AlbumRepository } from "@/albums/domain/album.repository";
import { GetAlbumsQuery } from "@/albums/application/query/get-albums.query";
import { GetAlbumDetailResult } from "@/albums/application/query/get-album-detail.result";

@QueryHandler(GetAlbumsQuery)
export class GetAlbumsHandler
    implements IQueryHandler<GetAlbumsQuery, GetAlbumDetailResult[]>
{
    constructor(
        @Inject(InjectionToken.ALBUM_REPOSITORY)
        private readonly albumRepository: AlbumRepository,
    ) {}

    async execute(command: GetAlbumsQuery): Promise<GetAlbumDetailResult[]> {
        const startDate = new Date(command.startDate);
        const endDate = new Date(command.endDate);

        endDate.setDate(endDate.getDate() + 1);

        const albums = await this.albumRepository.findMany(startDate, endDate);

        return albums
            ? albums.map((album) => {
                  return GetAlbumDetailResult.from(album);
              })
            : [];
    }
}
