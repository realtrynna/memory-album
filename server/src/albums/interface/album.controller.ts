import { Controller, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedParam, TypedRoute } from "@nestia/core";

import type { CreateAlbumDto } from "@/albums/interface/dto/create-album.dto";
import { CreateAlbumCommand } from "@/albums/application/commands/create-album.command";
import { JwtAuthGuard } from "@libs/guards/jwt-auth.guard";
import type { RequestUser } from "@/types";
import { responseWrap } from "@libs/response-wrap";
import { ResponseMap } from "@/constant";
import type { AddAlbumPostsDto } from "@/albums/interface/dto/add-album-posts.dto";
import typia from "typia";
import { AddAlbumPostsCommand } from "@/albums/application/commands/add-album-posts.command";

@ApiTags("앨범")
@Controller("albums")
@UseGuards(JwtAuthGuard)
export class AlbumController {
    constructor(readonly commandBus: CommandBus) {}

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
    }
}
