import { forwardRef, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "@/auth/interface/auth.controller";
import { LoginHandler } from "@/auth/application/commands/login.handler";
import { JwtStrategy } from "@/auth/interface/strategies/jwt.strategy";
import type { JwtOptions } from "@/types";
import { AppConfig } from "@/config/app-config";
import { UserModule } from "@/users/user.module";
import { PasswordModule } from "@libs/password/password.module";
import { RefreshHandler } from "@/auth/application/commands/refresh.handler";
import { AuthService } from "@/auth/application/auth.service";
import { KakaoStrategy } from "@/auth/interface/strategies/kakao.strategy";

const application = [LoginHandler, RefreshHandler, AuthService];

@Module({
    imports: [
        CqrsModule,
        JwtModule.registerAsync({
            useFactory: (appConfig: AppConfig) => {
                const { algorithm, secret, expiresIn } = appConfig.getEnv()[
                    "jwt"
                ] as JwtOptions;

                return {
                    issuer: "Memory album",
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
        forwardRef(() => UserModule),
        PasswordModule,
    ],
    controllers: [AuthController],
    providers: [...application, JwtStrategy, KakaoStrategy],
    exports: [AuthService],
})
export class AuthModule {}
