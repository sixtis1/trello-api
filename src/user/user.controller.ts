import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDTO} from "../models/dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("create-user")
    create_user (@Body() user_dto: CreateUserDTO): Promise<CreateUserDTO> {
        return this.userService.create_user(user_dto);
    }
}
