import { IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CardDTO {
  @ApiProperty({
    description: 'Title of the card',
    example: 'Task 1',
  })
  @IsString()
  @Length(1, 100, { message: 'Title must be between 1 and 100 characters' })
  title: string;

  @ApiProperty({
    description: 'Description of the card',
    example: 'This is a task description',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500, { message: 'Description cannot exceed 500 characters' })
  description?: string;
}
