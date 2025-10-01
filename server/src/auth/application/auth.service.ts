import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectionToken } from "@/users/application/injection-token";
import type { UserRepository } from "@/users/domain/user.repository";
import {
    TokenExpired,
    TokenValidate,
} from "@libs/exceptions/user/user.exception";
import type { JwtPayload } from "@/types";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(InjectionToken.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) {}

    async refresh(refreshToken: string) {
        try {
            const isVerify = this.jwtService.verify(refreshToken);

            if (!isVerify) {
                throw new TokenValidate();
            }

            const user = await this.userRepository.findUnique(isVerify.email);

            if (!user || refreshToken !== user?.getRefreshToken) {
                throw new TokenValidate();
            }

            const payload = {
                id: user.getId,
                email: user.getEmail,
            };

            const newAccessToken = this.accessToken(payload);
            const newRefreshToken = this.refreshToken(payload);

            await this.userRepository.updateRefreshToken(
                user.getEmail,
                newRefreshToken,
            );

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                throw new TokenExpired();
            }

            throw new TokenValidate();
        }
    }

    accessToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    refreshToken(payload: JwtPayload) {
        return this.jwtService.sign(payload, {
            expiresIn: "3d",
        });
    }
}
