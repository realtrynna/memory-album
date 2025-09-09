import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import type { PasswordService } from "@libs/password/password.module";

@Injectable()
export class PasswordServiceImplement implements PasswordService {
    async hash(password: string): Promise<string> {
        return argon2.hash(password);
    }

    async verify(hashedPassword: string, password: string): Promise<boolean> {
        return argon2.verify(hashedPassword, password);
    }
}
