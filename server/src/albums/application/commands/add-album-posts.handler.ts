import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { AddAlbumPostsCommand } from "@/albums/application/commands/add-album-posts.command";
import { InjectionToken } from "@/albums/application/injection-token";
import type { AlbumRepository } from "@/albums/domain/album.repository";
import { AlbumNotFound } from "@libs/exceptions/album/album.exception";

@CommandHandler(AddAlbumPostsCommand)
export class AddAlbumPostsHandler
    implements ICommandHandler<AddAlbumPostsCommand, void>
{
    constructor(
        @Inject(InjectionToken.ALBUM_REPOSITORY)
        private readonly albumRepository: AlbumRepository,
    ) {}

    async execute(command: AddAlbumPostsCommand) {
        const isAlbum = await this.albumRepository.isAlbum(command.albumId);

        if (!isAlbum) {
            throw new AlbumNotFound();
        }

        // const posts = await Promise.allSettled()
    }
}
