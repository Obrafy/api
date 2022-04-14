import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigInterface } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Instantiate config service
  const configService = app.get<ConfigService<ConfigInterface>>(ConfigService);

  const port = configService.get('PORT', { infer: true }) || 3000;
  await app.listen(port);
}
bootstrap();
