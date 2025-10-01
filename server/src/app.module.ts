import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from "@nestjs/common";

import { UserModule } from "@/users/user.module";
import { PrismaModule } from "@libs/prisma/prisma.module";
import { AuthModule } from "@/auth/auth.module";
import { AppConfigModule } from "@/config/app-config.module";
import { AlbumModule } from "@/albums/album.module";
import { MediaFileParseMiddleware } from "@libs/middlewares/media-file-parse.middleware";
import { PostModule } from "@/posts/post.module";

@Module({
    imports: [
        AppConfigModule,
        PrismaModule,
        UserModule,
        AuthModule,
        AlbumModule,
        PostModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MediaFileParseMiddleware).forRoutes({
            path: "posts",
            method: RequestMethod.POST,
        });
    }
}
