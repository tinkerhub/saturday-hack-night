import { useContext } from 'react';
import { AuthCtx } from '@app/contexts';

export const useAuthCtx = () => {
    const auth = useContext(AuthCtx);
    if (auth === null) {
        throw new Error('unable to access the authContext');
    }
    return auth;
};
