import { Controller, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { TypedRoute } from "@nestia/core";

import { JwtAuthGuard } from "@libs/guards/jwt-auth.guard";
import { CreatePostCommand } from "@/posts/commands/create-post.command";

@ApiTags("포스트")
@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(readonly commandBus: CommandBus) {}

    @TypedRoute.Post()
    async uploadMediaFile(@Req() req: Request) {
        // const command = new CreatePostCommand({});
    }
}
