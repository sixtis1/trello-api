import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class ColumnModel extends Model {
    @ForeignKey(() => User)
    @Column
    user_id: number;

    @Column
    name: string;
}
