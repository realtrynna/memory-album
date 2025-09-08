import { Module } from "@nestjs/common";

import { UserModule } from "@/users/user.module";
import { PrismaModule } from "@libs/prisma/prisma.module";
import { AuthModule } from "@/auth/auth.module";
import { AppConfigModule } from "@/config/app-config.module";

@Module({
    imports: [AppConfigModule, PrismaModule, UserModule, AuthModule],
})
export class AppModule {}
