import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../../models/dto/create_user";
import { LoginUserDTO } from "../../models/dto/login_user";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { AuthUserResponse } from "./response/auth.user.response";
import { JwtAuthGuard } from "../../guards/jwt-guard";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: CreateUserDTO, description: 'Data for user registration' })
    @ApiResponse({ status: 201, description: 'User successfully registered.', type: CreateUserDTO })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @Post('register')
    register(@Body() userDTO: CreateUserDTO): Promise<CreateUserDTO> {
        return this.authService.register_user(userDTO);
    }

    @ApiOperation({ summary: 'Log in a user' })
    @ApiBody({ type: LoginUserDTO, description: 'User login credentials' })
    @ApiResponse({ status: 200, description: 'User successfully logged in.', type: AuthUserResponse })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Post('login')
    login(@Body() userDTO: LoginUserDTO): Promise<AuthUserResponse> {
        return this.authService.login_user(userDTO);
    }

    @ApiOperation({ summary: 'Test route to check JWT authentication' })
    @ApiResponse({ status: 200, description: 'JWT is valid.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @UseGuards(JwtAuthGuard)
    @Post('test')
    test() {
        return true;
    }
}
