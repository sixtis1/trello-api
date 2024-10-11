import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { errors } from '../common/constants/errors';
import { ColumnService } from '../modules/column/column.service';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number };
}

@Injectable()
export class ColumnMatchGuard implements CanActivate {
  constructor(private readonly columnService: ColumnService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
    const user = request.user;
    const columnId = parseInt(request.params.columnId, 10);

    const column = await this.columnService.find_column_by_id_and_user(
      columnId,
      user.id,
    );
    if (!column) {
      throw new NotFoundException(errors.COLUMN_DOESNT_EXISTS);
    }

    if (column.user_id !== user.id) {
      throw new UnauthorizedException(errors.NOT_ACCESS_COLUMN);
    }

    return true;
  }
}
