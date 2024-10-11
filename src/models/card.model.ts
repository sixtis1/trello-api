import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ColumnModel } from './column.model';

@Table
export class Card extends Model {
  @ForeignKey(() => ColumnModel)
  @Column
  column_id: number;

  @Column
  title: string;

  @Column
  description: string;
}
