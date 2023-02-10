import { Module, DynamicModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { SupertokensService } from './supertokens/supertokens.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
    providers: [SupertokensService],
    exports: [],
    controllers: [],
    imports: [HttpModule, ProfileModule],
})
export class AuthModule {
    static forRoot({
        connectionURI,
        apiKey,
        appInfo,
        githubClientId,
        githubClientSecret,
        DashboardApiKey,
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
                        DashboardApiKey,
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
