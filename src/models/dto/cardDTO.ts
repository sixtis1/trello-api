import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CardDTO {
    @ApiProperty({
        description: 'Title of the card',
        example: 'Task 1',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Description of the card',
        example: 'This is a task description',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;
}
