import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {SequelizeModule} from "@nestjs/sequelize";
import configuration from "../../configuration";
import {User} from "../../models/user.model";
import {AuthModule} from "../auth/auth.module";
import {TokenModule} from "../token/token.module";
import {ColumnModel} from "../../models/column.model";
import {ColumnModule} from "../column/column.module";
import {Card} from "../../models/card.model";
import {CardModule} from "../card/card.module";
import {Comment} from "../../models/comment.model";
import {CommentModule} from "../comment/comment.module";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: "postgres",
        host: configService.get("db_host"),
        port: configService.get("db_port"),
        username: configService.get("db_user"),
        password: configService.get("db_password"),
        database: configService.get("db_name"),
        synchronize: true,
        autoLoadModels: true,
        models: [User, ColumnModel, Card, Comment]
      })
    }),
    UserModule,
    AuthModule,
    TokenModule,
    ColumnModule,
    CardModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
