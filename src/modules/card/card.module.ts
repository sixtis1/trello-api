import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from '../../models/card.model';
import { CardController } from './card.controller';
import { ColumnService } from '../column/column.service';
import { ColumnModel } from '../../models/column.model';

@Module({
  imports: [SequelizeModule.forFeature([Card, ColumnModel])],
  controllers: [CardController],
  providers: [CardService, ColumnService],
  exports: [CardService],
})
export class CardModule {}
