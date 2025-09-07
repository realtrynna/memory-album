import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { AuthController } from "@/auth/interface/auth.controller";
import { LoginHandler } from "@/auth/application/commands/login.handler";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@/auth/interface/strategies/jwt.strategy";

const application = [LoginHandler];

@Module({
    imports: [
        CqrsModule.forRoot(),
        JwtModule.register({
            secret: "jwt",
            signOptions: {
                issuer: "realtrynna",
                expiresIn: "180s",
            },
        }),
    ],
    controllers: [AuthController],
    providers: [...application, JwtStrategy,
    ],
})
export class AuthModule {
}