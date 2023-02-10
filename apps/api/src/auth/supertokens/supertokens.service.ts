import { HttpService } from '@nestjs/axios';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ProfileService } from 'src/profile/profile.service';
import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
    private readonly logger = new Logger(SupertokensService.name);

    constructor(
        @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
        private httpService: HttpService,
        private profileSevice: ProfileService,
    ) {
        supertokens.init({
            appInfo: this.config.appInfo,
            supertokens: {
                connectionURI: this.config.connectionURI,
                apiKey: this.config.apiKey,
            },
            recipeList: [
                Dashboard.init({
                    apiKey: this.config.DashboardApiKey,
                }),
                UserMetadata.init(),
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [
                            ThirdParty.Github({
                                clientId: this.config.githubClientId,
                                clientSecret: this.config.githubClientSecret,
                            }),
                        ],
                    },
                    override: {
                        apis: (originalImplementation) => ({
                            ...originalImplementation,
                            signInUpPOST: async (input) => {
                                if (originalImplementation.signInUpPOST === undefined) {
                                    throw Error('Should never come here');
                                }
                                const response = await originalImplementation.signInUpPOST(input);
                                if (response.status === 'OK') {
                                    if (response.createdNewUser) {
                                        const { user } = response;
                                        const { email, thirdParty, id } = user;
                                        const { userId } = thirdParty;
                                        const { data } = await firstValueFrom(
                                            this.httpService
                                                .get(`https://api.github.com/user/${userId}`)
                                                .pipe(
                                                    catchError((error: AxiosError) => {
                                                        this.logger.error(error.response?.data);
                                                        this.logger.log(
                                                            error.message,
                                                            'Github API Error',
                                                        );
                                                        throw error;
                                                    }),
                                                ),
                                        );
                                        const github = {
                                            id,
                                            name: data.name,
                                            email,
                                            avatar: data.avatar_url || null,
                                            githubid: data.login || null,
                                        };
                                        const temp = await this.profileSevice.create(github);
                                        this.logger.log(temp.message);
                                    }
                                }
                                return response;
                            },
                        }),
                    },
                }),
                Session.init(),
            ],
        });
    }
}
