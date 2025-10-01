import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreatePostCommand } from "@/posts/commands/create-post.command";
import { Post } from "@/posts/domain/post";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
    implements ICommandHandler<CreatePostCommand, void>
{
    async execute(command: CreatePostCommand) {
        const post = new Post({
            title: command.title,
            content: command.title,
            location: command.location,
            userId: command.userId,
            // file: command.file,
        });

        console.log(post);
    }
}
