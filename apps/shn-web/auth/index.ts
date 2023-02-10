import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import ThirdParty from 'supertokens-web-js/recipe/thirdparty';

const initAuth = () => {
    SuperTokens.init({
        appInfo: {
            apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN as string,
            appName: process.env.NEXT_PUBLIC_SUPERTOKENS_APP_NAME as string,
        },
        recipeList: [Session.init(), ThirdParty.init()],
    });
};

export default initAuth;
