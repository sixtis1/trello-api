import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CommentDTO {
    @ApiProperty({
        description: 'Content of the comment',
        example: 'This is a comment',
    })
    @IsString()
    @Length(1, 500, { message: 'Content must be between 1 and 500 characters' })
    content: string;
}
