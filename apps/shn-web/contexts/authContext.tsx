import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Session from 'supertokens-web-js/recipe/session';
import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-web-js/recipe/thirdparty';
import { api } from '@app/api';
import { Child, User } from '@app/types';

interface Prop {
    user: User | null;
    isUserLoading: boolean;
    setUser: React.Dispatch<User | null>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isProfileComplete: boolean;
}

export const AuthCtx = createContext({} as Prop);

export const AuthContext = ({ children }: Child) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isUserLoading, setUserLoading] = useState<boolean>(true);
    const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
    const { doesSessionExist } = Session;

    const login = async () => {
        try {
            const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
                providerId: 'github',
                authorisationURL: 'http://localhost:3000/auth',
            });
            window.location.assign(authUrl);
        } catch (err: any) {
            router.push('/error');
        } finally {
            setUserLoading(false);
        }
    };
    const logout = async () => {
        await Session.signOut();
        setUser(null);
    };
    const getData = async () => {
        try {
            setUserLoading(true);
            const { data } = await api.get('/profile');
            if (!data.Success) {
                throw new Error();
            }
            if (data.Success && data.data === null) {
                router.push('/error');
            }
            if (data.Success && data.data) {
                setUser(data.data);
                if (data.data.mobile) setIsProfileComplete(true);
            }
        } catch {
            router.push('/error');
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            setUserLoading(true);
            if (await doesSessionExist()) {
                getData();
            } else {
                setUserLoading(false);
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
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [doesSessionExist, isUserLoading, user],
    );

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
