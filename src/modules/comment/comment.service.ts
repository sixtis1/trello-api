import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from '../../models/comment.model';
import { CommentDTO } from 'src/models/dto/commentDTO';
import { errors } from "../../common/constants/errors";
import { Card } from '../../models/card.model';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment) private readonly commentRepository: typeof Comment,
        @InjectModel(Card) private readonly cardRepository: typeof Card
    ) {}

    async find_comment_by_id_and_card_id(cardId: number, dto: CommentDTO): Promise<Comment | null> {
        return await this.commentRepository.findOne({
            where: { content: dto.content, card_id: cardId }
        });
    }

    async check_exists_card(cardId: number): Promise<boolean> {
        const existCard = await this.cardRepository.findOne({ where: { id: cardId } });
        return Boolean(existCard);
    }

    async create_comment(cardId: number, dto: CommentDTO) {
        if (!await this.check_exists_card(cardId)) throw new NotFoundException(errors.CARD_DOESNT_EXISTS);
        if (await this.find_comment_by_id_and_card_id(cardId, dto))
            throw new BadRequestException(errors.COMMENT_ALREADY_EXISTS);

        const comment = {
            content: dto.content,
            card_id: cardId,
        };

        await this.commentRepository.create(comment);
        return comment;
    }

    async get_all_comments(cardId: number) {
        if (!await this.check_exists_card(cardId)) throw new NotFoundException(errors.CARD_DOESNT_EXISTS);

        return await this.commentRepository.findAll({ where: { card_id: cardId } });
    }

    async update_comment(cardId: number, commentId: number, dto: CommentDTO) {
        const comment = await this.commentRepository.findOne({where:{id: commentId, card_id: cardId}});

        if (!await this.check_exists_card(cardId)) throw new NotFoundException(errors.CARD_DOESNT_EXISTS);
        if (!comment) throw new NotFoundException(errors.COMMENT_DOESNT_EXISTS);
        if (dto.content == comment.content) throw new BadRequestException(errors.COMMENT_ALREADY_EXISTS);

        if (dto.content) comment.content = dto.content;

        return await comment.save();
    }

    async delete_comment(cardId: number, commentId: number) {
        const comment = await this.commentRepository.findOne({
            where: { id: commentId, card_id: cardId }});

        if (!await this.check_exists_card(cardId)) throw new NotFoundException(errors.CARD_DOESNT_EXISTS);
        if (!comment) throw new NotFoundException(errors.COMMENT_DOESNT_EXISTS);

        await comment.destroy();
        return true;
    }
}
