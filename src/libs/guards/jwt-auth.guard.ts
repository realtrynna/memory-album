import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserUnauthorized } from "@libs/exceptions/user/user.exception";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    canActivate(ctx: ExecutionContext) {
        return super.canActivate(ctx);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw new UserUnauthorized();
        }

        return user;
    }
}
