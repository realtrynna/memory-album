import { Global, Module } from "@nestjs/common";

import { AppConfig } from "@/config/app-config";

@Global()
@Module({
    imports: [],
    providers: [AppConfig],
    exports: [AppConfig],
})
export class AppConfigModule {}
