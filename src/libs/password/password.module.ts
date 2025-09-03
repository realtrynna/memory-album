import { Module } from "@nestjs/common";

import { PasswordService } from "@libs/password/password.service";

export const PASSWORD_SERVICE_TOKEN = "PASSWORD_SERVICE_TOKEN";

@Module({
    providers: [
        {
            provide: PASSWORD_SERVICE_TOKEN,
            useClass: PasswordService,
        },
    ],
    exports: [PASSWORD_SERVICE_TOKEN],
})
export class PasswordModule {}
