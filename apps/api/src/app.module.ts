import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string(),
                SUPERTOKENS_APP_NAME: Joi.string(),
                SUPERTOKENS_API_KEY: Joi.string(),
                SUPERTOKENS_API_DOMAIN: Joi.string(),
                SUPERTOKENS_WEBSITE_DOMAIN: Joi.string(),
                SUPERTOKENS_CONNECTION_URI: Joi.string(),
                GITHUB_CLIENT_ID: Joi.string(),
                GITHUB_CLIENT_SECRET: Joi.string(),
                EMAIL_HOST: Joi.string(),
                EMAIL_USERNAME: Joi.string(),
                EMAIL_PASSWORD: Joi.string(),
                MAIL_FROM: Joi.string(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        PrismaModule,
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        translateTime: true,
                        ignore: 'pid,hostname',
                    },
                },
            },
        }),

        AuthModule.forRoot({
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI || '',
            apiKey: process.env.SUPERTOKENS_API_KEY || '',
            appInfo: {
                appName: process.env.SUPERTOKENS_APP_NAME || '',
                apiDomain: process.env.SUPERTOKENS_API_DOMAIN || '',
                websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN || '',
            },
            githubClientId: process.env.GITHUB_CLIENT_ID || '',
            githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        }),
        MailModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
