import {Functions, httpsCallable} from "firebase/functions";

import {useState} from "react";
import {useParams} from "react-router-dom";

import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * Component to allow users to accept team invite.
 *
 * @author Rohit T P
 * @returns { JSX.Element } /join route
 */
function Join({functions}: { functions: Functions })
{
    const {eventId, teamId} = useParams<{ eventId: string, teamId: string }>();
    const [status, setStatus] = useState({state: 0, message: ""});

    httpsCallable(functions, "joinTeam")({teamId, eventId})
        .then(() => setStatus({state: 1, message: "Done"}))
        .catch((error) => setStatus({state: -1, message: error.message}));

    return (
        <>
            {status.state === 0 && <><CircularProgress/> Joining Team</>}
            {status.state === 1 && <>Team Joined <CheckCircleIcon/></>}
            {status.state === -1 && <>{status.message} <ErrorIcon/></>}
        </>
    );
}

export default Join;
