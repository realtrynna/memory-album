import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectionToken } from "@/users/application/injection-token";
import type { UserRepository } from "@/users/domain/user.repository";
import {
    NotFound,
    TokenExpired,
    TokenValidate,
} from "@libs/exceptions/user/user.exception";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(InjectionToken.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) {}

    async refresh(refreshToken: string) {
        try {
            const isVerify = await this.jwtService.verify(refreshToken);

            if (!isVerify) {
                throw new TokenValidate();
            }

            const user = await this.userRepository.findUnique(isVerify.email);

            if (!user || refreshToken !== user?.getRefreshToken) {
                throw new TokenValidate();
            }
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                throw new TokenExpired();
            }

            throw new TokenValidate();
        }
    }
}
