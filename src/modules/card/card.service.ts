import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Card } from '../../models/card.model'
import { CardDTO } from 'src/models/dto/cardDTO';
import { User } from "../../models/user.model";
import { errors } from "../../common/constants/errors";
import {ColumnModel} from "../../models/column.model";
import {ColumnDTO} from "../../models/dto/columnDTO";

@Injectable()
export class CardService {
    constructor(@InjectModel(Card) private readonly cardRepository: typeof Card,
                @InjectModel(ColumnModel) private readonly columnRepository: typeof ColumnModel) {}

    async find_card_by_title_and_column_id(columnId: number, dto: CardDTO): Promise<any> {
        const existColumn = await this.cardRepository.findOne({
            where: {
                column_id: columnId,
                title: dto.title
            }
        });
        return Boolean(existColumn);
    }

    async check_exists_column(columnId: number): Promise<any> {
        const existColumn = await this.columnRepository.findOne({where: {id: columnId}});
        return Boolean(existColumn);
    }


    async create_card(columnId: number, dto: CardDTO) {
        const exitCard = await this.find_card_by_title_and_column_id(columnId, dto)
        if (exitCard) throw new BadRequestException(errors.CARD_ALREADY_EXISTS);
        if (!await this.check_exists_column(columnId)) throw new NotFoundException(errors.COLUMN_DOESNT_EXISTS);

        const card = {
            title: dto.title,
            column_id: columnId,
            description: dto.description || null,
        }

        await this.cardRepository.create(card)
        return card
    }

    async get_all_cards(columnId: number) {
        if (!await this.check_exists_column(columnId)) throw new NotFoundException(errors.COLUMN_DOESNT_EXISTS);

        return await this.cardRepository.findAll({ where: { column_id: columnId } });
    }

    async update_card(columnId: number, cardId: number, dto: CardDTO) {
        const card = await this.cardRepository.findOne({
            where: {id: cardId, column_id: columnId
            }});

        if (!await this.check_exists_column(columnId)) throw new NotFoundException(errors.COLUMN_DOESNT_EXISTS);
        if (!card) throw new NotFoundException(errors.CARD_DOESNT_EXISTS);

        if (dto.title) card.title = dto.title;
        if (dto.description) card.description = dto.description;

        return await card.save()
    }

    async delete_card(columnId: number, cardId: number) {
        const card = await this.cardRepository.findOne({
            where: {id: cardId, column_id: columnId
            }});

        if (!await this.check_exists_column(columnId)) throw new NotFoundException(errors.COLUMN_DOESNT_EXISTS);
        if (!card) throw new NotFoundException(errors.CARD_DOESNT_EXISTS);

        await card.destroy()
        return true
    }

    async get_card(columnId: number, cardId: number) {
        const card = await this.cardRepository.findOne({
            where: {id: cardId, column_id: columnId
            }});

        if (!await this.check_exists_column(columnId)) throw new NotFoundException(errors.COLUMN_DOESNT_EXISTS);
        if (!card) throw new NotFoundException(errors.CARD_DOESNT_EXISTS);

        return await this.cardRepository.findOne({where: {id: cardId, column_id: columnId}});
    }
}
