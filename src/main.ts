import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const config = new DocumentBuilder()
    .setTitle('Todo doc')
    .setDescription('Todo documentation')
    .setVersion('1.0')
    .addTag('todo')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)

  await app.listen(8000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
