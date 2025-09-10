import { Module } from "@nestjs/common";

import { PasswordServiceImplement } from "@libs/password/password.service";

export interface PasswordService {
    hash(password: string): Promise<string>;
    verify(hashedPassword: string, password: string): Promise<boolean>;
}

export const PASSWORD_SERVICE_IMPLEMENT_TOKEN =
    "PASSWORD_SERVICE_IMPLEMENT_TOKEN";

@Module({
    providers: [
        {
            provide: PASSWORD_SERVICE_IMPLEMENT_TOKEN,
            useClass: PasswordServiceImplement,
        },
    ],
    exports: [PASSWORD_SERVICE_IMPLEMENT_TOKEN],
})
export class PasswordModule {}
