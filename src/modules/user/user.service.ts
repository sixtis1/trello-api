import {BadRequestException, HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../../models/user.model";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO} from "../../models/dto/create_user";
import {errors} from "../../common/constants/errors";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User){}

    async hashPassword(password: string){
        return bcrypt.hash(password, 10);
    }

    async check_existing_user(email: string, username: string){
        const user_email = await this.userRepository.findOne({where: {email:email}});
        const user_username = await this.userRepository.findOne({where: {username:username}});
        return (user_email || user_username);
    }

    async find_user_by_email(email: string){
        return await this.userRepository.findOne({where: {email:email}});
    }

    async create_user(userDTO: CreateUserDTO): Promise<CreateUserDTO> {
        userDTO.password = await this.hashPassword(userDTO.password);

        const newUser = {
            username: userDTO.username,
            email: userDTO.email,
            password: userDTO.password
        }

        await this.userRepository.create(newUser);
        return userDTO
    }
}
