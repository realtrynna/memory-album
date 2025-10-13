import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { AlbumController } from "@/albums/interface/album.controller";
import { CreateAlbumHandler } from "@/albums/application/commands/create-album.handler";
import { InjectionToken } from "@/albums/application/injection-token";
import { AlbumRepositoryImplement } from "@/albums/infrastructure/album.repository.implement";
import { AddAlbumPostsHandler } from "@/albums/application/commands/add-album-posts.handler";

const application = [CreateAlbumHandler, AddAlbumPostsHandler];
const infrastructure = [
    {
        provide: InjectionToken.ALBUM_REPOSITORY,
        useClass: AlbumRepositoryImplement,
    },
];

@Module({
    controllers: [AlbumController],
    imports: [CqrsModule],
    providers: [...application, ...infrastructure],
})
export class AlbumModule {}
