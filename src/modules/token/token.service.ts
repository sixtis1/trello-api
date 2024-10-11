import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async generate_jwt_token(user: any) {
        const payload = { id: user.id, email: user.email, username: user.username }
        return this.jwtService.sign(payload, {
            secret: this.configService.get('jwt_secret'),
            expiresIn: this.configService.get('jwt_expire')
        });
    }
}
