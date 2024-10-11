import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Card } from './card.model';

@Table
export class Comment extends Model {
  @ForeignKey(() => Card)
  @Column
  card_id: number;

  @Column
  content: string;
}
