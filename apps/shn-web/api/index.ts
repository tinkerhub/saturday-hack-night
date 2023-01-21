import Axios from 'axios';
import Session from 'supertokens-web-js/recipe/session';

const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
Session.addAxiosInterceptors(api);

export default api;
