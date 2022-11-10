import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
    constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
        supertokens.init({
            appInfo: config.appInfo,
            supertokens: {
                connectionURI: config.connectionURI,
                apiKey: config.apiKey,
            },
            recipeList: [
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [
                            ThirdParty.Github({
                                clientId: '467101b197249757c71f',
                                clientSecret: 'e97051221f4b6426e8fe8d51486396703012f5bd',
                            }),
                        ],
                    },
                }),
                Session.init(),
            ],
        });
    }
}
