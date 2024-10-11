import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ColumnModel} from "../../models/column.model";

@Module({
  imports: [SequelizeModule.forFeature([ColumnModel])],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports: [ColumnService]
})
export class ColumnModule {}
