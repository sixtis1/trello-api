import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({
        description: 'The username of the new user',
        example: 'john_doe',
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'The email address of the new user',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the new user',
        example: 'strongPassword123!',
    })
    @IsString()
    password: string;
}
