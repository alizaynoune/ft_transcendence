import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { AuthAdapter } from "./socket/auth.adapter";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "./auth/auth.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useWebSocketAdapter(new AuthAdapter(app, app.get(PrismaService), app.get(AuthService)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  await app.listen(5000);
}
bootstrap();
