import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";

@Table
export class Coloumn extends Model {
    @ForeignKey(() => User)
    user_id: number

    @Column
    name: string
}