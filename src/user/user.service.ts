import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../models/user.model";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO} from "../models/dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User){}

    async hashPassword(password:string){
        return bcrypt.hash(password, 10);
    }

    async create_user(userDTO): Promise<CreateUserDTO> {
        userDTO.password = await this.hashPassword(userDTO.password);
        await this.userRepository.create(userDTO);
        return userDTO
    }
}
