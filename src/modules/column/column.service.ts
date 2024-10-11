import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ColumnModel} from "../../models/columnModel";
import {ColumnDTO} from 'src/models/dto/columnDTO';
import {User} from "../../models/user.model";
import {errors} from "../../common/constants/errors";

@Injectable()
export class ColumnService {
    constructor(@InjectModel(ColumnModel) private readonly columnRepository: typeof ColumnModel) {
    }

    async find_column_by_name_and_user_id(user: User, dto: ColumnDTO): Promise<any> {
        const existColumn = await this.columnRepository.findOne({
            where: {
                user_id: user.id,
                name: dto.name
            }
        });
        return Boolean(existColumn);
    }


    async create_column(user: User, dto: ColumnDTO){
        const existingColumn=  await this.find_column_by_name_and_user_id(user, dto);
        if (existingColumn) throw new BadRequestException(errors.COLUMN_ALREADY_EXISTS);

        const column = {
            user_id: user.id,
            name: dto.name
        }

        await this.columnRepository.create(column)
        return column
    }


    async get_all_columns(user: User){
        return await this.columnRepository.findAll({ where: { user_id: user.id } });
    }


    async update_column(user: User,column_id: number, dto: ColumnDTO): Promise <ColumnModel>{
        const column = await this.columnRepository.findOne({
            where: { id: column_id, user_id: user.id },
        });

        if (!column) throw new NotFoundException(errors.COLUMN_DOESNT_EXISTS);

        if (column.name == dto.name) throw new BadRequestException(errors.COLUMN_ALREADY_EXISTS);

        column.name = dto.name
        await column.save()

        return column
    }


    async delete_column(user: User, column_id: number){
        const column = await this.columnRepository.findOne({
            where: { id: column_id, user_id: user.id
            },});

        if (!column) throw new NotFoundException(errors.COLUMN_DOESNT_EXISTS);

        await column.destroy()
        return true
    }

    async get_column(user: User, column_id: number){
        const column = await this.columnRepository.findOne({
            where: { id: column_id, user_id: user.id
            },});

        if (!column) throw new NotFoundException(errors.COLUMN_DOESNT_EXISTS);

        return await this.columnRepository.findOne({where: { id: column_id, user_id: user.id}});
    }
}
