import { LoadingAnimation } from '@app/components/utils';
import { useAuth } from '@app/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signInAndUp } from 'supertokens-web-js/recipe/thirdparty';

const Auth = () => {
    const router = useRouter();
    const { getData } = useAuth();
    async function handleGithubCallback() {
        try {
            const response = await signInAndUp();
            if (response.status === 'OK') {
                await getData();
                await router.push('/');
            }
        } catch (err: any) {
            router.push('/error');
        }
    }

    useEffect(() => {
        handleGithubCallback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <LoadingAnimation />;
};
export default Auth;
