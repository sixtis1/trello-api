import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from '../../models/card.model';
import { Comment } from '../../models/comment.model';
import { CardService } from '../card/card.service';
import { ColumnModel } from '../../models/column.model';
import { ColumnService } from '../column/column.service';

@Module({
  imports: [SequelizeModule.forFeature([Comment, Card, ColumnModel])],
  controllers: [CommentController],
  providers: [CommentService, CardService, ColumnService],
})
export class CommentModule {}
