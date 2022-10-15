import React, { useEffect, useState } from 'react';
import { CircularProgress, FormErrorIcon, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { httpsCallable } from 'firebase/functions';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useFirebase } from '../context/firebase';
import { getParams } from '../utils/getParams';

const Join = () => {
    const { eventID, teamID } = getParams(useLocation().search);
    const { auth, functions } = useFirebase();
    const [status, setStatus] = useState({ state: 0, message: '' });
    useEffect(() => {
        if (!eventID || !teamID)
            setStatus({ state: -1, message: 'TeamID and EventID are required.' });
        else if (status.state === 0 && auth.user !== undefined)
            if (auth.user)
                httpsCallable(
                    functions,
                    'joinTeam',
                )({ teamID, eventID })
                    .then(() => setStatus({ state: 1, message: 'Done' }))
                    .catch((error) => setStatus({ state: -1, message: error.message }));
            else signInWithPopup(auth, new GithubAuthProvider());
    }, [auth, eventID, teamID, functions, status.state]);
    return (
        <div
            style={{
                padding: '2rem',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {status.state === 0 && (
                <Text variant="h6">
                    <CircularProgress />
                    Joining Team
                </Text>
            )}
            {status.state === 1 && (
                <Text variant="h6">
                    Team Joined
                    <CheckCircleIcon />
                </Text>
            )}
            {status.state === -1 && (
                <Text variant="h6">
                    {status.message} <FormErrorIcon />
                </Text>
            )}
        </div>
    );
};
export default Join;
