import { Controller, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { TypedBody, TypedRoute } from "@nestia/core";

import { JwtAuthGuard } from "@libs/guards/jwt-auth.guard";
import { CreatePostCommand } from "@/posts/application/command/create-post.command";
import type { CreatePostDto } from "@/posts/interface/dto/create-post.dto";
import { JwtPayload } from "@/types";
import { responseWrap } from "@libs/response-wrap";
import { ResponseMap } from "@/constant";

@ApiTags("포스트")
@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(readonly commandBus: CommandBus) {}

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
