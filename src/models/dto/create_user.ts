import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({
        description: 'The username of the new user',
        example: 'john_doe',
    })
    @IsString()
    @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
    username: string;

    @ApiProperty({
        description: 'The email address of the new user',
        example: 'john.doe@example.com',
    })
    @IsEmail({}, { message: 'Must be a valid email address' })
    email: string;

    @ApiProperty({
        description: 'The password of the new user',
        example: 'strongPassword123!',
    })
    @IsString()
    @Length(6, 100, { message: 'Password must be between 6 and 100 characters' })
    password: string;
}
