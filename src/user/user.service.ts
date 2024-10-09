import { Injectable } from '@nestjs/common';
import {users} from "../mocks";

@Injectable()
export class UserService {
    getUsers() {
        return users;
    }
}
