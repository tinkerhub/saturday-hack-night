import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
    const fastify = new FastifyAdapter({
        logger: false,
    });
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify, {
        bufferLogs: true,
    });

    const config = new DocumentBuilder()
        .setTitle('SHN Platform APIs')
        .setDescription('APIs provided by SHN Platform')
        .setVersion('0.0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    await app.listen((process.env.PORT as string) || 3001);
}
bootstrap();
