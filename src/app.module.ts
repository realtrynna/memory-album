import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import env from "@/config/env";
import { UsersModule } from "@/users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            load: [env],
        }),
        UsersModule,
    ],
})
export class AppModule {}
