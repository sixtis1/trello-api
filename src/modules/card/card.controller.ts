import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CardDTO } from '../../models/dto/cardDTO';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserMatchGuard } from '../../guards/user-match-guard';
import { ColumnMatchGuard } from '../../guards/column-match-guard';

@ApiTags('Cards')
@Controller('users/:userId/columns/:columnId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({ summary: 'Create a new card' })
  @ApiBody({ type: CardDTO, description: 'Data for creating a new card' })
  @ApiResponse({ status: 201, description: 'Card successfully created.' })
  @ApiResponse({
    status: 400,
    description: 'A card with this name already exists.',
  })
  @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
  @Post('create')
  create_card(@Body() cardDTO: CardDTO, @Req() request: any) {
    return this.cardService.create_card(request.params.columnId, cardDTO);
  }

  @ApiOperation({ summary: 'Get all cards for a column' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved cards.' })
  @ApiResponse({ status: 403, description: 'Access denied.' })
  @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
  @Get('get-all-cards')
  async get_all_cards(@Req() request: any) {
    return await this.cardService.get_all_cards(request.params.columnId);
  }

  @ApiOperation({ summary: 'Update a card by ID' })
  @ApiParam({
    name: 'cardId',
    type: Number,
    description: 'ID of the card to update',
  })
  @ApiBody({ type: CardDTO, description: 'New data for updating the card' })
  @ApiResponse({ status: 200, description: 'Card successfully updated.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
  @Patch(':cardId/update')
  async update_card(
    @Param('cardId') cardId: number,
    @Body() cardDTO: CardDTO,
    @Req() request: any,
  ) {
    return await this.cardService.update_card(
      request.params.columnId,
      cardId,
      cardDTO,
    );
  }

  @ApiOperation({ summary: 'Delete a card by ID' })
  @ApiParam({
    name: 'cardId',
    type: Number,
    description: 'ID of the card to delete',
  })
  @ApiResponse({ status: 200, description: 'Card successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
  @Delete(':cardId/delete')
  async delete_card(@Param('cardId') cardId: number, @Req() request: any) {
    return await this.cardService.delete_card(request.params.columnId, cardId);
  }

  @ApiOperation({ summary: 'Get a card by ID' })
  @ApiParam({ name: 'cardId', type: Number, description: 'ID of the card' })
  @ApiResponse({ status: 200, description: 'Card retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  @UseGuards(JwtAuthGuard, UserMatchGuard, ColumnMatchGuard)
  @Get(':cardId')
  async get_card(@Param('cardId') cardId: number, @Req() request: any) {
    return await this.cardService.get_card(request.params.columnId, cardId);
  }
}
