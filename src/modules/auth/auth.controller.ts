import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDTO} from "../../models/dto/create_user";
import {LoginUserDTO} from "../../models/dto/login_user";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() userDTO: CreateUserDTO): Promise<CreateUserDTO> {
        return this.authService.register_user(userDTO);
    }

    @Post('login')
    login (@Body() userDTO: LoginUserDTO): Promise<LoginUserDTO> {
        return this.authService.login_user(userDTO)
    }
}
