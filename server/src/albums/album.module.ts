import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { AlbumController } from "@/albums/interface/album.controller";
import { CreateAlbumHandler } from "@/albums/application/command/create-album.handler";
import { InjectionToken } from "@/albums/application/injection-token";
import { AlbumRepositoryImplement } from "@/albums/infrastructure/album.repository.implement";
import { AddAlbumPostsHandler } from "@/albums/application/command/add-album-posts.handler";
import { InjectionToken as PostInjectionToken } from "@/posts/application/injection-token";
import { PostRepositoryImplement } from "@/posts/infrastructure/post.repository.implement";
import { GetAlbumDetailHandler } from "@/albums/application/query/get-album-detail.handler";
import { GetAlbumsHandler } from "@/albums/application/query/get-albums.handler";

const application = [
    CreateAlbumHandler,
    AddAlbumPostsHandler,
    GetAlbumDetailHandler,
    GetAlbumsHandler,
];
const infrastructure = [
    {
        provide: InjectionToken.ALBUM_REPOSITORY,
        useClass: AlbumRepositoryImplement,
    },
    {
        provide: PostInjectionToken.POST_REPOSITORY,
        useClass: PostRepositoryImplement,
    },
];

@Module({
    controllers: [AlbumController],
    imports: [CqrsModule],
    providers: [...application, ...infrastructure],
})
export class AlbumModule {}
