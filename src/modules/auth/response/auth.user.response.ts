import {IsEmail, IsString} from "class-validator";

export class AuthUserResponse {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    token: string;

}