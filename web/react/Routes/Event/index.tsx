import React, {useEffect, useState} from "react";
import {Firestore, collection, getDocs, query, QueryDocumentSnapshot, DocumentData, getDoc, doc, orderBy, where} from "firebase/firestore";
import {Auth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, User} from "firebase/auth";
import {Button, Typography, Card, CardContent, CardMedia, CardActionArea, CardActions, Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import RegistrationModal from "./RegistrationModal";
import noImage from "../../../assets/fallbacks/no-image.png";
import ResultsModal from "./ResultsModal";
interface CardProps
{
    doc: QueryDocumentSnapshot<DocumentData>;
    db: Firestore;
    user: User | null;
    auth: Auth;
}

function ActionAreaCard({doc, db, user, auth}: CardProps)
{
    const [openRegistrations, setOpenRegistrations] = useState(false);
    const [openResults, setOpenResults] = useState(false);
    const provider = new GithubAuthProvider();

    return (
        <>
            {user && <RegistrationModal open={openRegistrations} setOpen={setOpenRegistrations} id={doc.id} user={user} db={db}/>}
            {openResults && <ResultsModal open={openResults} setOpenResults={setOpenResults} id={doc.id} db={db}/>}

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
                        {
                            doc.get("registration") && <Button size="small" onClick={() => user ? setOpenRegistrations(true) : signInWithPopup(auth, provider)}>
                                Create Team
                            </Button>
                        }
                        {
                            doc.get("results") && <Button size="small" onClick={() => setOpenResults(true)}>
                                Results
                            </Button>
                        }

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
    const [onGoingEvents, setOnGoingEvents] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);
    const [pastEvents, setPastEvents] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    useEffect(() =>
    {

        onAuthStateChanged(auth, async (authUser) =>
        {
            setUser(authUser);
            if (authUser)
            {
                const snap = await getDoc(doc(db, `users/${authUser.uid}`));
                if (!snap.get("phno") || !snap.get("email"))
                    navigate("/profile?back=event");
            }
        });
        getDocs(query(collection(db, "events"), where("registration", "==", true )))
            .then((snapshot) => setOnGoingEvents(snapshot.docs))
            .catch((error) => console.error(error));
        
        getDocs(query(collection(db, "events"), orderBy("time", "asc"), where("registration", "==", false )))
            .then((snapshot) => setPastEvents(snapshot.docs))
            .catch((error) => console.error(error));
        
    }
    , [auth, db, navigate]);

    return (
        <Container maxWidth="lg" style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
            
            {
                onGoingEvents.length > 0 && <div>
                    <Typography style={{marginLeft:"1rem"}} color="white" component="h3" variant="h4">Ongoing Events</Typography>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                        {onGoingEvents.map((doc, i) => <ActionAreaCard key={i} doc={doc} db={db} user={user} auth={auth}/>)}
                    </div>
                </div>
            }
            <br/>
            <Typography style={{marginLeft:"1rem"}} color="white" component="h3" variant="h4">Past Events</Typography>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {pastEvents.map((doc, i) => <ActionAreaCard key={i} doc={doc} db={db} user={user} auth={auth}/>)}
            </div>
        </Container>
    );
}

export default Event;
