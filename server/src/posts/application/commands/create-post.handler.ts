import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreatePostCommand } from "@/posts/application/commands/create-post.command";
import { Post } from "@/posts/domain/post";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "@/posts/application/injection-token";
import type { PostRepository } from "@/posts/domain/post.repository";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
    implements ICommandHandler<CreatePostCommand, void>
{
    constructor(
        @Inject(InjectionToken.POST_REPOSITORY)
        private readonly postRepository: PostRepository,
    ) {}

    async execute(command: CreatePostCommand) {
        const post = new Post({
            title: command.title,
            content: command.content,
            location: command.location,
            userId: command.userId,
            images: command.images,
        });
    }
}
