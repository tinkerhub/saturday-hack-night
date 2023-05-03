/* eslint-disable import/no-import-module-exports */

import supertokens from 'supertokens-node';
import { NestFactory } from '@nestjs/core';
import { errorHandler, plugin } from 'supertokens-node/framework/fastify';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

declare const module: any;
async function bootstrap() {
    const fastify = new FastifyAdapter({
        logger: false,
    });
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify, {
        bufferLogs: true,
    });
    app.enableCors({
        origin: process.env.SUPERTOKENS_WEBSITE_DOMAIN,
        allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
        credentials: true,
    });
    await app.register(plugin);
    fastify.setErrorHandler(errorHandler());
    const config = new DocumentBuilder()
        .setTitle('SHN Platform APIs')
        .setDescription('APIs provided by SHN Platform')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    await app.init();

    return {
        app,
        fastify: fastify.getInstance(),
    };
}

async function startServer() {
    const { app } = await bootstrap();
    await app.listen(process.env.PORT as string, '0.0.0.0');
    // eslint-disable-next-line no-console
    console.log(`Application is running on: ${await app.getUrl()}`);
    // webpack based hot reloading
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

startServer();
