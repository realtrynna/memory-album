import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
    TokenExpired,
    TokenValidate,
} from "@libs/exceptions/user/user.exception";
import { TokenExpiredError } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    canActivate(ctx: ExecutionContext) {
        return super.canActivate(ctx);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            const tokenErr = err ?? info;

            if (info instanceof TokenExpiredError) {
                throw new TokenExpired();
            }

            throw new TokenValidate();
        }

        return user;
    }
}
