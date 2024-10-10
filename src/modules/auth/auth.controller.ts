import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDTO} from "../../models/dto/create_user";
import {LoginUserDTO} from "../../models/dto/login_user";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthUserResponse} from "./response/auth.user.response";
import {JwtAuthGuard} from "../../guards/jwt-guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiTags('API')
    @ApiResponse({status: 201, type: CreateUserDTO})
    @Post('register')
    register(@Body() userDTO: CreateUserDTO): Promise<CreateUserDTO> {
        return this.authService.register_user(userDTO);
    }

    @ApiTags('API')
    @ApiResponse({status: 200, type: AuthUserResponse})
    @Post('login')
    login (@Body() userDTO: LoginUserDTO): Promise<AuthUserResponse> {
        return this.authService.login_user(userDTO)
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test () {
        return true
    }
}
