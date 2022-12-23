import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import ThirdParty from 'supertokens-web-js/recipe/thirdparty';

const initAuth = () => {
    SuperTokens.init({
        appInfo: {
            apiDomain: 'http://localhost:3001',
            appName: 'Saturday HackNight',
        },
        recipeList: [Session.init(), ThirdParty.init()],
    });
};

export default initAuth;
