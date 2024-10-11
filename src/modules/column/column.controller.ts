import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ColumnService } from "./column.service";
import { ColumnDTO } from "../../models/dto/columnDTO";
import { JwtAuthGuard } from "../../guards/jwt-guard";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { UserMatchGuard } from "../../guards/user-match-guard";

@ApiTags('Columns')
@Controller('users/:userId/columns')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @ApiOperation({ summary: 'Create a new column' })
    @ApiBody({ type: ColumnDTO, description: 'Data for creating a new column' })
    @ApiResponse({ status: 201, description: 'Column successfully created.' })
    @ApiResponse({ status: 400, description: 'A column with this name already exists.' })
    @UseGuards(JwtAuthGuard, UserMatchGuard)
    @Post('create')
    create_column(@Body() columDTO: ColumnDTO, @Req() request: any) {
        const user = request.user;
        return this.columnService.create_column(user, columDTO);
    }

    @ApiOperation({ summary: 'Get all columns for a user' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved columns.' })
    @ApiResponse({ status: 403, description: 'Access denied.' })
    @UseGuards(JwtAuthGuard, UserMatchGuard)
    @Get('get-all-columns')
    async get_all_column(@Req() request: any) {
        const user = request.user;
        return await this.columnService.get_all_columns(user);
    }

    @ApiOperation({ summary: 'Update a column by ID' })
    @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column to update' })
    @ApiBody({ type: ColumnDTO, description: 'New data for updating the column' })
    @ApiResponse({ status: 200, description: 'Column successfully updated.' })
    @ApiResponse({ status: 404, description: 'Column not found.' })
    @ApiResponse({ status: 400, description: 'A column with this name already exists.' })
    @UseGuards(JwtAuthGuard, UserMatchGuard)
    @Patch(':columnId/update')
    async update_column(
        @Param('columnId') columnId: number,
        @Body() columnDto: ColumnDTO,
        @Req() request: any
    ) {
        const user = request.user;
        return await this.columnService.update_column(user, columnId, columnDto);
    }

    @ApiOperation({ summary: 'Delete a column by ID' })
    @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column to delete' })
    @ApiResponse({ status: 200, description: 'Column successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Column not found.' })
    @UseGuards(JwtAuthGuard, UserMatchGuard)
    @Delete(':columnId/delete')
    async delete_column(
        @Param('columnId') columnId: number,
        @Req() request: any
    ) {
        const user = request.user;
        return await this.columnService.delete_column(user, columnId);
    }

    @ApiOperation({ summary: 'Get a column by ID' })
    @ApiParam({ name: 'columnId', type: Number, description: 'ID of the column' })
    @ApiResponse({ status: 200, description: 'Column retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Column not found.' })
    @UseGuards(JwtAuthGuard, UserMatchGuard)
    @Get(':columnId')
    async get_column(
        @Param('columnId') columnId: number,
        @Req() request: any
    ) {
        const user = request.user;
        return await this.columnService.get_column(user, columnId);
    }
}
