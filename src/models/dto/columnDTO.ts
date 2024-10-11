import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnDTO {
  @ApiProperty({
    description: 'Name of the column',
    example: 'ToDo',
  })
  @IsString()
  @Length(1, 50, { message: 'Name must be between 1 and 50 characters' })
  name: string;
}
