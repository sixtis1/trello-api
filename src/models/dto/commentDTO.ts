import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CommentDTO {
    @ApiProperty({
        description: 'Content of the comment',
        example: 'This is a comment',
    })
    @IsString()
    content: string;
}
