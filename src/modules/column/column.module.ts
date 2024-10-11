import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ColumnModel} from "../../models/columnModel";

@Module({
  imports: [SequelizeModule.forFeature([ColumnModel])],
  controllers: [ColumnController],
  providers: [ColumnService]
})
export class ColumnModule {}
