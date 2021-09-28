import {Auth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, User} from "firebase/auth";
import {Functions, httpsCallable} from "firebase/functions";

import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@mui/material/Typography";

function getParams(params: string)
{
    const rawParams = params.replace("?", "").split("&");
    const extractedParams: { [key: string]: string } = {};
    rawParams.forEach((item) =>
    {
        const items = item.split("=");
        extractedParams[items[0]] = items[1];
    });
    return extractedParams;
}


/**
 * Component to allow users to accept team invite.
 *
 * @author Rohit T P
 * @returns { JSX.Element } /join route
 */
function Join({functions, auth}: { functions: Functions, auth: Auth })
{
    const {eventID, teamID} = getParams(useLocation().search);
    const [status, setStatus] = useState({state: 0, message: ""});
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => onAuthStateChanged(auth, setUser), [auth]);

    useEffect(
        () =>
        {
            if (!eventID || !teamID)
                setStatus({state: -1, message: "TeamID and EventID are required."});
            else if (status.state === 0 && user !== undefined)
                if (user)
                    httpsCallable(functions, "joinTeam")({teamID, eventID})
                        .then(() => setStatus({state: 1, message: "Done"}))
                        .catch((error) => setStatus({state: -1, message: error.message}));
                else
                    signInWithPopup(auth, new GithubAuthProvider());
        },
        [auth, eventID, teamID, functions, status.state, user]);

    return (
        <div style={{padding: "2rem", justifyContent: "center", display: "flex"}}>
            {status.state === 0 && <Typography variant="h6" gutterBottom><CircularProgress/>Joining Team</Typography>}
            {status.state === 1 && <Typography variant="h6" gutterBottom>Team Joined<CheckCircleIcon/></Typography>}
            {status.state === -1 && <Typography variant="h6" gutterBottom>{status.message} <ErrorIcon/></Typography>}
        </div>
    );
}

export default Join;
