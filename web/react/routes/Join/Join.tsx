import { User, onAuthStateChanged, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth, functions } from "../../firebase";
import { getParams } from "../../utils/index";
import { RotateCircleLoading } from "react-loadingg";
import "./Join.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Join()
{

    const {eventID, teamID} = getParams(useLocation().search);
    const [status, setStatus] = useState({state: 0, message: ""});
    const [user, setUser] = useState<User | null | undefined>(undefined);
    library.add(faCheckCircle, faTimes);
    useEffect(() => onAuthStateChanged(auth, setUser), []);

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
        [eventID, teamID, status.state, user]);

    return (
        <div className="join-container">
            {
                status.state === 0 &&
                <>
                    <RotateCircleLoading color="#600f8f"/>
                    Joining Team 
                </>
            }
            {
                status.state === 1 && 
                <>
                    <FontAwesomeIcon icon="check-circle"/>&nbsp;
                    <h3>Successfully joined team!</h3>
                </>
            }
            {
                status.state === -1 && 
                <>
                    <FontAwesomeIcon icon="times"/>&nbsp;
                    <h3>Unable to Join Team</h3>
                </>
            }
        </div>     
    );
}
export default Join;
