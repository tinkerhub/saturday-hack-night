import Axios from 'axios';
import Session from 'supertokens-web-js/recipe/session';

const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3001',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
Session.addAxiosInterceptors(api);

export default api;
