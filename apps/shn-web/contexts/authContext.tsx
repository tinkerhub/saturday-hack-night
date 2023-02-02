import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Session from 'supertokens-web-js/recipe/session';
import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-web-js/recipe/thirdparty';
import api from '@app/api';
import { Child, User } from '@app/types';

interface Prop {
    user: User | null;
    isUserLoading: boolean;
    setUser: React.Dispatch<User | null>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isProfileComplete: boolean;
    getData: () => Promise<void>;
}

export const AuthContext = createContext({} as Prop);

export const AuthProvider = ({ children }: Child) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isUserLoading, setUserLoading] = useState<boolean>(false);
    const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
    const { doesSessionExist } = Session;

    const getData = async () => {
        try {
            const { data } = await api.get('/profile');
            if (!data.success) {
                throw new Error();
            }
            if (data.success && data.data === null) {
                router.push('/error');
            }
            if (data.success && data.data) {
                setUser(data.data);
                if (data.data.mobile) setIsProfileComplete(true);
            }
        } catch {
            router.push('/error');
        }
    };

    const login = async () => {
        setUserLoading(true);
        try {
            const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
                providerId: 'github',
                authorisationURL: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/auth`,
            });
            router.push(authUrl);
        } catch (err: any) {
            router.push('/error');
        } finally {
            setUserLoading(false);
        }
    };

    const logout = async () => {
        setUserLoading(true);
        await Session.signOut();
        setUserLoading(false);
        setUser(null);
    };

    useEffect(() => {
        (async () => {
            if (await doesSessionExist()) {
                await getData();
            }
        })();
        return () => {
            setUser(null);
            setUserLoading(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doesSessionExist]);

    const value = useMemo(
        () => ({
            user,
            isUserLoading,
            isProfileComplete,
            setUser,
            login,
            logout,
            getData,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [doesSessionExist, isUserLoading, user, setUser, isProfileComplete],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
