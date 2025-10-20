import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreatePostCommand } from "@/posts/application/command/create-post.command";
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

    async execute(command: CreatePostCommand): Promise<void> {
        const post = new Post({
            title: command.title,
            content: command.content,
            location: command.location,
            userId: command.userId,
            images: command.images.map((file) => {
                return {
                    filename: file.filename,
                    savedFilename: file.savedFilename,
                    extension: file.extension,
                    size: file.size,
                    path: file.path,
                };
            }),
        });

        await this.postRepository.create(post);
    }
}
