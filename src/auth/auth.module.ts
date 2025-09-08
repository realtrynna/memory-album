import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "@/auth/interface/auth.controller";
import { LoginHandler } from "@/auth/application/commands/login.handler";
import { JwtStrategy } from "@/auth/interface/strategies/jwt.strategy";
import type { JwtOptions } from "@/types";
import { AppConfig } from "@/config/app-config";

const application = [LoginHandler];

@Module({
    imports: [
        CqrsModule.forRoot(),
        JwtModule.registerAsync({
            useFactory: (appConfig: AppConfig) => {
                const { algorithm, secret, expiresIn } = appConfig.getEnv()[
                    "jwt"
                ] as JwtOptions;

                return {
                    privateKey: appConfig.getPrivateKey(),
                    publicKey: appConfig.getPublicKey(),
                    signOptions: {
                        algorithm,
                        expiresIn,
                    },
                };
            },
            inject: [AppConfig],
        }),
    ],
    controllers: [AuthController],
    providers: [...application, JwtStrategy],
})
export class AuthModule {}
