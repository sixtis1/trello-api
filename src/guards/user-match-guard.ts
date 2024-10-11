import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import {errors} from "../common/constants/errors";

@Injectable()
export class UserMatchGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userId = parseInt(request.params.userId, 10);

        if (user.id !== userId) {
            throw new UnauthorizedException(errors.NOT_ACCESS_COLUMN);
        }

        return true;
    }
}
