import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDTO} from "../../models/dto/create_user";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}


}
