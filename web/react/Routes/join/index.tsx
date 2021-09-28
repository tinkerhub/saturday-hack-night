import {Auth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, User} from "firebase/auth";
import {Functions, httpsCallable} from "firebase/functions";

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@mui/material/Typography";

/**
 * Component to allow users to accept team invite.
 *
 * @author Rohit T P
 * @returns { JSX.Element } /join route
 */
function Join({functions, auth}: { functions: Functions, auth: Auth })
{
    const {eventId, teamId} = useParams<{ eventId: string, teamId: string }>();
    const [status, setStatus] = useState({state: 0, message: ""});
    const [user, setUser] = useState<User | null | undefined>(undefined);

    onAuthStateChanged(auth, setUser);

    useEffect(
        () =>
        {
            if (status.state === 0 && user !== undefined)
                if (user)
                    httpsCallable(functions, "joinTeam")({teamId, eventId})
                        .then(() => setStatus({state: 1, message: "Done"}))
                        .catch((error) => setStatus({state: -1, message: error.message}));
                else
                    signInWithPopup(auth, new GithubAuthProvider());
        },
        [auth, eventId, functions, status.state, teamId, user]);

    return (
        <div style={{padding: "2rem", justifyContent: "center", display: "flex"}}>
            {status.state === 0 && <Typography variant="h6" gutterBottom><CircularProgress/>Joining Team</Typography>}
            {status.state === 1 && <Typography variant="h6" gutterBottom>Team Joined<CheckCircleIcon/></Typography>}
            {status.state === -1 && <Typography variant="h6" gutterBottom>{status.message} <ErrorIcon/></Typography>}
        </div>
    );
}

export default Join;
