import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { AddAlbumPostsCommand } from "@/albums/application/command/add-album-posts.command";
import { InjectionToken } from "@/albums/application/injection-token";
import type { AlbumRepository } from "@/albums/domain/album.repository";
import { AlbumNotFound } from "@libs/exceptions/album/album.exception";
import { InjectionToken as PostInjectionToken } from "@/posts/application/injection-token";
import type { PostRepository } from "@/posts/domain/post.repository";
import { PostNotFound } from "@libs/exceptions/post/post.exception";

@CommandHandler(AddAlbumPostsCommand)
export class AddAlbumPostsHandler
    implements ICommandHandler<AddAlbumPostsCommand, void>
{
    constructor(
        @Inject(InjectionToken.ALBUM_REPOSITORY)
        private readonly albumRepository: AlbumRepository,
        @Inject(PostInjectionToken.POST_REPOSITORY)
        private readonly postRepository: PostRepository,
    ) {}

    async execute(command: AddAlbumPostsCommand) {
        const album = await this.albumRepository.findUniqueByAlbumId(
            command.albumId,
        );

        if (!album) {
            throw new AlbumNotFound();
        }

        await Promise.all(
            command.postIds.map(async (postId) => {
                const post =
                    await this.postRepository.findUniqueByPostId(postId);

                if (!post) {
                    throw new PostNotFound();
                }
            }),
        );

        await this.albumRepository.addAlbumPosts(
            command.albumId,
            command.postIds,
        );
    }
}
