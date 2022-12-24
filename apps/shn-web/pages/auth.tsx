import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signInAndUp } from 'supertokens-web-js/recipe/thirdparty';

const Auth = () => {
    const router = useRouter();
    async function handleGithubCallback() {
        try {
            const response = await signInAndUp();

            if (response.status === 'OK') {
                router.back();
            } else {
                router.push('/error');
            }
        } catch (err: any) {
            router.push('/error');
        }
    }

    useEffect(() => {
        handleGithubCallback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>Logging In</>;
};
export default Auth;
