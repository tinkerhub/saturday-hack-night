import {
    Firestore,
    collection,
    getDocs,
    query,
    where,
    QueryDocumentSnapshot,
    DocumentData, getDoc, doc,
} from "firebase/firestore";
import {Auth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, User} from "firebase/auth";

import React, {useEffect, useState} from "react";

import RegistrationModal from "./RegistrationModal";
import noImage from "../../../assets/fallbacks/no-image.png";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import {useHistory} from "react-router-dom";


interface CardProps
{
    doc: QueryDocumentSnapshot<DocumentData>;
    db: Firestore;
    user: User | null;
    auth: Auth;
}

function ActionAreaCard({doc, db, user, auth}: CardProps)
{
    const [open, setOpen] = useState(false);
    const provider = new GithubAuthProvider();

    return (
        <>
            {user && <RegistrationModal open={open} setOpen={setOpen} id={doc.id} user={user} db={db}/>}
            <Card sx={{width: 300, margin: "1rem"}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={doc.get("image") || noImage}
                        alt="Event banner"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {doc.get("name")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {doc.get("about")}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => user ? setOpen(true) : signInWithPopup(auth, provider)}>
                            Create Team
                        </Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </>
    );
}

/**
 * Component to show the events page.
 *
 * @author Rohit T P
 * @returns { JSX.Element } Event route
 */
function Event({db, auth}: { db: Firestore, auth: Auth }): JSX.Element
{
    const [events, setEvents] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);
    const [user, setUser] = useState<User | null>(null);

    const history = useHistory();

    useEffect(() =>
        onAuthStateChanged(auth, async (authUser) =>
        {
            setUser(authUser);
            if (authUser)
            {
                const snap = await getDoc(doc(db, `users/${authUser.uid}`));
                if (!snap.get("phno") || !snap.get("email"))
                    history.replace("/profile?back=event");
            }
        }), [auth, db, history]);

    getDocs(query(collection(db, "events"), where("registration", "==", true)))
        .then((snapshot) => setEvents(snapshot.docs))
        .catch((error) => console.error(error));

    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {events.map((doc, i) => <ActionAreaCard key={i} doc={doc} db={db} user={user} auth={auth}/>)}
        </div>
    );
}

export default Event;
