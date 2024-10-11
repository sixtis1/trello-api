import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthUserResponse {
    @ApiProperty({
        example: 'user@example.com',
        description: 'The email of the authenticated user'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'john_doe',
        description: 'The username of the authenticated user'
    })
    @IsString()
    username: string;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'The JWT token issued after successful authentication'
    })
    @IsString()
    token: string;
}
