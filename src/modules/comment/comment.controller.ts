import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDTO } from 'src/models/dto/commentDTO';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { UserMatchGuard } from '../../guards/user-match-guard';
import { ColumnMatchGuard } from '../../guards/column-match-guard';

@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
    @Post('create')
    async create_comment(@Body() commentDTO: CommentDTO, @Req() request: any) {
        return this.commentService.create_comment(request.params.cardId, commentDTO);
    }

    @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
    @Get('get-all-comments')
    async get_all_comments(@Req() request: any) {
        return this.commentService.get_all_comments(request.params.cardId);
    }

    @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
    @Patch(':commentId/update')
    async update_comment(
        @Param('commentId') commentId: number,
        @Body() commentDTO: CommentDTO,
        @Req() request: any
    ) {
        return this.commentService.update_comment(request.params.cardId, commentId, commentDTO);
    }

    @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
    @Delete(':commentId/delete')
    async delete_comment(
        @Param('commentId') commentId: number,
        @Req() request: any
    ) {
        return this.commentService.delete_comment(request.params.cardId, commentId);
    }
}
