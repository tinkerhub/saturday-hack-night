import {DocumentData, Firestore, getDoc, doc, updateDoc, DocumentSnapshot} from "firebase/firestore";
import {Auth, GithubAuthProvider, signInWithPopup} from "firebase/auth";

import React, {useEffect, useState} from "react";

import {Container, Snackbar, TextField} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import {getParams} from "../../utils";
import {useHistory, useLocation} from "react-router-dom";


interface ProfileProps
{
    auth: Auth;
    db: Firestore;
}

/**
 * Component to show the events page.
 *
 * @author Rohit T P
 * @returns { JSX.Element } Event route
 */
function Profile({auth, db}: ProfileProps): JSX.Element
{
    const [user, setUser] = useState<DocumentSnapshot<DocumentData> | null>(null);
    const [data, setData] = useState({phno: "", email: ""});
    const [error, setError] = useState({phno: false, email: false});
    const [status, setStatus] = useState(0);

    const {back} = getParams(useLocation().search);
    const history = useHistory();

    useEffect(() =>
    {
        auth.onAuthStateChanged(async (authUser) =>
        {
            if (!authUser)
                signInWithPopup(auth, new GithubAuthProvider());
            else
            {
                const snap = await getDoc(doc(db, `users/${authUser.uid}`));
                setUser(snap);
                setData({phno: snap.get("phno"), email: snap.get("email")});
            }
        });

    }, [auth, db]);

    function SaveDetails()
    {
        if (!data.email || !data.email.match(/^\S+@\S+\.\S+$/gi))
            return setError((error) => ({...error, email: true}));

        if (!data.phno || !data.phno.match(/^(\+\d{1,3})?\d{10}$/g))
            return setError((error) => ({...error, phno: true}));

        if (!user)
            return;

        setError({phno: false, email: false});

        updateDoc(user.ref, data)
            .then(() => setStatus(1))
            .then(() => back && history.push(back))
            .catch(() => setStatus(-1));
    }

    return (
        <Container sx={{width: "min(100%, 500px)", marginTop: "1rem"}}>
            <Paper elevation={3} sx={{padding: "1rem"}}>
                <Snackbar open={status === 1} autoHideDuration={6000} onClose={() => setStatus(0)}>
                    <Alert severity="success">Details Saved</Alert>
                </Snackbar>
                <Snackbar open={status === -1} autoHideDuration={6000} onClose={() => setStatus(0)}>
                    <Alert severity="error">Failed to save details</Alert>
                </Snackbar>
                <div style={{justifyContent: "center", display: "flex"}}>
                    {user &&
                    <Avatar src={user.get("avatar")} alt={user.get("name")}
                        style={{width: 90, height: 90, margin: "auto"}}
                    />}
                </div>
                <TextField
                    label="Email" fullWidth error={error.email}
                    helperText={error.email ? "Should be a valid email" : ""}
                    sx={{marginBottom: "1.1rem", marginTop: "1.1rem"}}
                    value={data.email}
                    onChange={({target}) => setData((data) => ({...data, email: target.value}))}
                />
                <TextField
                    label="Phone Number" fullWidth error={error.phno}
                    helperText={error.phno ? "Should be a valid phone number" : ""}
                    sx={{marginBottom: "1.1rem", marginTop: "1.1rem"}}
                    value={data.phno}
                    onChange={({target}) => setData((data) => ({...data, phno: target.value}))}
                />
                <Button variant="contained" onClick={SaveDetails}>Save</Button>
            </Paper>
        </Container>
    );
}

export default Profile;

