import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDTO } from 'src/models/dto/commentDTO';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { UserMatchGuard } from '../../guards/user-match-guard';
import { ColumnMatchGuard } from '../../guards/column-match-guard';
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Comments')
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
    @ApiOperation({ summary: 'Create a new comment' })
    @ApiResponse({ status: 201, description: 'Comment created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 404, description: 'Card or column not found.' })
    @Post('create')
    async create_comment(@Body() commentDTO: CommentDTO, @Req() request: any) {
        return this.commentService.create_comment(request.params.cardId, commentDTO);
    }

    @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
    @ApiOperation({ summary: 'Get all comments for a specific card' })
    @ApiResponse({ status: 200, description: 'Comments retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Card or column not found.' })
    @Get('get-all-comments')
    async get_all_comments(@Req() request: any) {
        return this.commentService.get_all_comments(request.params.cardId);
    }

    @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
    @ApiParam({ name: 'commentId', description: 'ID of the comment to update' })
    @ApiResponse({ status: 200, description: 'Comment updated successfully.' })
    @ApiResponse({ status: 404, description: 'Comment, card, or column not found.' })
    @Patch(':commentId/update')
    async update_comment(
        @Param('commentId') commentId: number,
        @Body() commentDTO: CommentDTO,
        @Req() request: any
    ) {
        return this.commentService.update_comment(request.params.cardId, commentId, commentDTO);
    }

    @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
    @ApiOperation({ summary: 'Delete a comment' })
    @ApiParam({ name: 'commentId', description: 'ID of the comment to delete' })
    @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Comment, card, or column not found.' })
    @Delete(':commentId/delete')
    async delete_comment(
        @Param('commentId') commentId: number,
        @Req() request: any
    ) {
        return this.commentService.delete_comment(request.params.cardId, commentId);
    }
}
