import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
      .setTitle("Trello API")
      .setDescription("Test task\n")
      .setVersion("1.0")
      .addTag("API")
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document)

  await app.listen(configService.get("port"));
}
bootstrap();
