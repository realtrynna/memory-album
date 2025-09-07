import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import env from "@/config/env";
import { UserModule } from "@/users/user.module";
import { PrismaModule } from "@libs/prisma/prisma.module";
import { AuthModule } from "@/auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            load: [env],
        }),
        PrismaModule,
        UserModule,
        AuthModule
    ],
})
export class AppModule {}
