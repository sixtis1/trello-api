import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDTO {
    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'strongPassword123!',
    })
    @IsString()
    password: string;
}
