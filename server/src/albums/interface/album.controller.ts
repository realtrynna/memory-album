import { Controller, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from "@nestia/core";

import type { CreateAlbumDto } from "@/albums/interface/dto/create-album.dto";
import { CreateAlbumCommand } from "@/albums/application/command/create-album.command";
import { JwtAuthGuard } from "@libs/guards/jwt-auth.guard";
import type { RequestUser } from "@/types";
import { responseWrap } from "@libs/response-wrap";
import { ResponseMap } from "@/constant";
import type { AddAlbumPostsDto } from "@/albums/interface/dto/add-album-posts.dto";
import { AddAlbumPostsCommand } from "@/albums/application/command/add-album-posts.command";
import { GetAlbumDetailQuery } from "@/albums/application/query/get-album-detail.query";
import { GetAlbumsQuery } from "@/albums/application/query/get-albums.query";
import type { GetListDto } from "@/albums/interface/dto/get-list.dto";
import { GetAlbumDetailResult } from "@/albums/application/query/get-album-detail.result";

@ApiTags("앨범")
@Controller("albums")
@UseGuards(JwtAuthGuard)
export class AlbumController {
    constructor(
        readonly commandBus: CommandBus,
        readonly queryBus: QueryBus,
    ) {}

    @TypedRoute.Get("/:albumId/posts")
    async getAlbumDetail(@TypedParam("albumId") albumId: number) {
        const command = new GetAlbumDetailQuery(albumId);

        const result = await this.queryBus.execute(command);

        return responseWrap(ResponseMap.GET_ALBUM_DETAIL_SUCCESS, result);
    }

    @TypedRoute.Get()
    async getAlbums(@TypedQuery() getAlbumsDto: GetListDto) {
        const command = new GetAlbumsQuery(
            getAlbumsDto.startDate,
            getAlbumsDto.endDate,
        );

        const result = await this.queryBus.execute(command);

        return responseWrap(ResponseMap.GET_ALBUMS_SUCCESS, result);
    }

    @TypedRoute.Post()
    async createAlbum(
        @TypedBody() createAlbumDto: CreateAlbumDto,
        @Req() req: RequestUser,
    ) {
        const command = new CreateAlbumCommand(
            req.user.id,
            createAlbumDto.title,
        );

        await this.commandBus.execute(command);

        return responseWrap(ResponseMap.ALBUM_CREATE_SUCCESS, null);
    }

    @TypedRoute.Post("/:albumId/posts")
    async addAlbumPosts(
        @TypedParam("albumId") albumId: number,
        @TypedBody() addAlbumPostsDto: AddAlbumPostsDto,
    ) {
        const command = new AddAlbumPostsCommand(
            albumId,
            addAlbumPostsDto.postIds,
        );

        await this.commandBus.execute(command);

        return responseWrap(ResponseMap.ADD_ALBUM_POSTS_SUCCESS, null);
    }
}
