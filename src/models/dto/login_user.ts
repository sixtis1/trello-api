import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDTO {
    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
    })
    @IsEmail({}, { message: 'Must be a valid email address' })
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'strongPassword123!',
    })
    @IsString()
    @Length(6, 100, { message: 'Password must be between 6 and 100 characters' })
    password: string;
}
