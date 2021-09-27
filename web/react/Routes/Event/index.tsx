import {
    Firestore,
    collection,
    getDocs,
    query,
    where,
    QueryDocumentSnapshot,
    DocumentData,
} from "firebase/firestore";
import {Auth, onAuthStateChanged} from "firebase/auth";
import Firebase from "firebase/compat";

import React, {useState} from "react";
import {useHistory} from "react-router-dom";

import RegistrationModal from "./RegistrationModal";
import noImage from "../../../assets/fallbacks/no-image.png";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";


interface CardProps
{
    doc: QueryDocumentSnapshot<DocumentData>;
    db: Firestore;
    user: Promise<Firebase.User>;
}

function ActionAreaCard({doc, db, user}: CardProps)
{
    const [open, setOpen] = useState(false);

    return (
        <>
            <RegistrationModal open={open} setOpen={setOpen} id={doc.id} user={user} db={db}/>
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
                        <Button size="small" onClick={() => setOpen(true)}>Create Team</Button>
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
    const history = useHistory();
    const [events, setEvents] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);

    const user = new Promise<Firebase.User>((resolve) =>
        onAuthStateChanged(auth, (user) => user ? resolve(user as Firebase.User) : history.replace("/")));

    getDocs(query(collection(db, "events"), where("registration", "==", true)))
        .then((snapshot) => setEvents(snapshot.docs))
        .catch((error) => console.error(error));

    return (
        <>
            <div className="navbar">
                <h1 className="headline">Saturday Hack Night</h1>
                <hr className="line"/>
                <p className="subhead">Upcoming Events</p>
            </div>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {events.map((doc, i) => <ActionAreaCard key={i} doc={doc} db={db} user={user}/>)}
            </div>
        </>
    );
}

export default Event;
