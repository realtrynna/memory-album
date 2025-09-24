import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { CreateAlbumCommand } from "@/albums/application/commands/create-album.command";
import { InjectionToken } from "@/albums/application/injection-token";
import type { AlbumRepository } from "@/albums/domain/album.repository";
import { Album } from "@/albums/domain/album";

@CommandHandler(CreateAlbumCommand)
export class CreateAlbumHandler
    implements ICommandHandler<CreateAlbumCommand, void>
{
    constructor(
        @Inject(InjectionToken.ALBUM_REPOSITORY)
        private readonly albumRepository: AlbumRepository,
    ) {}

    async execute(command: CreateAlbumCommand) {
        const album = new Album({
            userId: command.userId,
            title: command.title,
        });

        await this.albumRepository.create(album);
    }
}
