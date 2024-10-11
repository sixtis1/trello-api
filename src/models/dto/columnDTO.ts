import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ColumnDTO {
    @ApiProperty({
        description: 'Name of the column',
        example: 'ToDo',
    })
    @IsString()
    name: string;
}
