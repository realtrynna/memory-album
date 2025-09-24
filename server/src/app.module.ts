import { Module } from "@nestjs/common";

import { UserModule } from "@/users/user.module";
import { PrismaModule } from "@libs/prisma/prisma.module";
import { AuthModule } from "@/auth/auth.module";
import { AppConfigModule } from "@/config/app-config.module";
import { AlbumModule } from "@/albums/album.module";

@Module({
    imports: [
        AppConfigModule,
        PrismaModule,
        UserModule,
        AuthModule,
        AlbumModule,
    ],
})
export class AppModule {}
