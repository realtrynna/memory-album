import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import env from "@/config/env";
import { UsersModule } from "@/users/users.module";
import { PrismaModule } from "@libs/db/prisma.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            load: [env],
        }),
        PrismaModule,
        UsersModule,
    ],
})
export class AppModule {}
