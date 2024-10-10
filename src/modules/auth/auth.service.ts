import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO} from "../../models/dto/create_user";
import {errors} from "../../common/constants/errors";
import {LoginUserDTO} from "../../models/dto/login_user";
import {TokenService} from "../token/token.service";
import {AuthUserResponse} from "./response/auth.user.response";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly tokenService: TokenService,
                ) {}

    async register_user(userDTO: CreateUserDTO): Promise<CreateUserDTO> {

        const user_exist = await this.userService.check_existing_user(userDTO.email, userDTO.username);
        if (user_exist) throw new BadRequestException(errors.USER_ALREADY_EXISTS);
        return this.userService.create_user(userDTO)
    }

    async login_user(userDTO: LoginUserDTO): Promise<AuthUserResponse> {
        const exist_user = await this.userService.find_user_by_email(userDTO.email);
        if (!exist_user) throw new BadRequestException(errors.USER_NOT_EXISTS);

        const validate_password = await bcrypt.compare(userDTO.password, exist_user.password);
        if (!validate_password) throw new BadRequestException(errors.WRONG_DATA)

        const token = await this.tokenService.generate_jwt_token(userDTO.email);
        return {...exist_user, token}
    }
}
