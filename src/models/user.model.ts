import {Column, HasMany, Model, Table} from "sequelize-typescript";
import {ColumnModel} from "./columnModel";

@Table
export class User extends Model{
    @Column
    username: string;

    @Column
    email: string;

    @Column
    password: string;

    @HasMany(() => ColumnModel, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    columns: ColumnModel[]
}