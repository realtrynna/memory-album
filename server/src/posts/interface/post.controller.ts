import { Controller, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { TypedBody, TypedQuery, TypedRoute } from "@nestia/core";

import { JwtAuthGuard } from "@libs/guards/jwt-auth.guard";
import { CreatePostCommand } from "@/posts/application/command/create-post.command";
import type { CreatePostDto } from "@/posts/interface/dto/create-post.dto";
import { responseWrap } from "@libs/response-wrap";
import { ResponseMap } from "@/constant";
import type { GetListDto } from "@/albums/interface/dto/get-list.dto";
import { GetPostsQuery } from "@/posts/application/query/get-posts.query";

@ApiTags("포스트")
@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(
        readonly commandBus: CommandBus,
        readonly queryBus: QueryBus,
    ) {}

    @TypedRoute.Get()
    async getPosts(@TypedQuery() getPostsDto: GetListDto) {
        const command = new GetPostsQuery(
            getPostsDto.startDate,
            getPostsDto.endDate,
        );

        const result = await this.queryBus.execute(command);

        result.map((v) => {
            console.log(v.images);
        });

        return result;
    }

    @TypedRoute.Post()
    async createPost(
        @Req() req: Request,
        @TypedBody() createPostDto: CreatePostDto,
    ) {
        const command = new CreatePostCommand(
            createPostDto.title,
            createPostDto.content,
            createPostDto.location,
            req.user.id,
            createPostDto.imageList,
        );

        await this.commandBus.execute(command);

        return responseWrap(ResponseMap.POST_CREATE_SUCCESS, null);
    }

    @TypedRoute.Post("file")
    async uploadMediaFile(@Req() req: Request) {
        return responseWrap(ResponseMap.MEDIA_FILE_UPLOAD_SUCCESS, req.file);
    }
}
