import { Module, DynamicModule } from '@nestjs/common';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { SupertokensService } from './supertokens/supertokens.service';

@Module({
    providers: [SupertokensService],
    exports: [],
    controllers: [],
})
export class AuthModule {
    static forRoot({
        connectionURI,
        apiKey,
        appInfo,
        githubClientId,
        githubClientSecret,
    }: AuthModuleConfig): DynamicModule {
        return {
            providers: [
                {
                    useValue: {
                        appInfo,
                        connectionURI,
                        apiKey,
                        githubClientId,
                        githubClientSecret,
                    },
                    provide: ConfigInjectionToken,
                },
                SupertokensService,
            ],
            exports: [],
            imports: [],
            module: AuthModule,
        };
    }
}
