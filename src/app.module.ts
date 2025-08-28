import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import env from "@/config/env";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            load: [env],
        }),
    ],
})
export class AppModule {}
