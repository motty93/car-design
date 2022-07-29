import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieSession from 'cookie-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    cookieSession({
      keys: ['asdfasdf'],
    }),
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  await app.listen(3000)
}
bootstrap()
