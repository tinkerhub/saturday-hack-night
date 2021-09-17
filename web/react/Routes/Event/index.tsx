import { 
    Firestore, 
    collection, 
    getDocs, 
    query, 
    where, 
    QueryDocumentSnapshot, 
    DocumentData,
    addDoc,
} from "firebase/firestore";

import { useState } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import DialogContent from "@mui/material/DialogContent";
import FormHelperText from "@mui/material/FormHelperText";
import DialogActions from "@mui/material/DialogActions";
import Input from "@mui/material/Input";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalProps {
    open: boolean, 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    id: string,
    lead: string,
    db: Firestore
}

interface CardProps {
    doc: QueryDocumentSnapshot<DocumentData>
    db: Firestore
}


function BasicModal({open, setOpen, id, lead, db}: ModalProps) 
{
    const [data, setData] = useState({name: "", repo: "", members: ""});
    const [status, setStatus] = useState(0);

    async function createTeam()
    {
        try 
        {
            const members = [];

            for(const member of data.members.split(","))
            {
                const snap = await getDocs(query(collection(db, "users"), where("githubID", "==", member)));
                if(!snap.empty && snap.docs[0] && snap.docs[0].id !== lead)
                    members.push(snap.docs[0].id);
            }
        
            await addDoc(collection(db, `events/${id}/teams`), {
                name: data.name,
                repo: data.repo,
                members,
                lead
            });

            setStatus(1);
        }
        catch(error)
        {
            setStatus(-1);
        }
    }

    return (
        <div>
            
            {status === 0 ? <></> : status === -1 ? 
                <Alert severity="error">Team creation failed.</Alert> : 
                <Alert severity="success">Team Created !</Alert>
            }
            
            
            <Dialog open={open}>
                <DialogTitle>Create Team</DialogTitle>
                <form onSubmit={(e) => (e.preventDefault(), createTeam())}>
                    <DialogContent>
                    
                        <FormControl>
                            <InputLabel htmlFor="name">Team Name</InputLabel>
                            <Input type="text" id="name" aria-describedby="name-text" required={true} 
                                fullWidth onChange={(e) => setData((data) => (data.name = e.target.value, data))}/>
                            <FormHelperText id="name-text">An alpha numeric name.</FormHelperText>
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="repo">Repo Url</InputLabel>
                            <Input type="text" id="repo" aria-describedby="repo-text" required={true} 
                                fullWidth onChange={(e) => setData((data) => (data.repo = e.target.value, data))}/>
                            <FormHelperText id="repo-text">http://github.com/userId/repo-name.</FormHelperText>
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="members">Members</InputLabel>
                            <Input type="text" id="members" aria-describedby="members-text" required={true} 
                                fullWidth onChange={(e) => setData((data) => (data.members = e.target.value, data))}/>
                            <FormHelperText id="members-text">GitHub Ids separated by &rsquo;,&rsquo;</FormHelperText>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" variant="contained">Create</Button>
                        <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

function ActionAreaCard({doc, db}:CardProps) 
{
    const [open, setOpen] = useState(false);

    return (
        <>
            <BasicModal open={open} setOpen={setOpen} id={doc.id} lead={doc.get("lead")} db={db} />
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={doc.get("image")}
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
 * Component description.
 * 
 * @author Rohit T P
 * @returns { JSX.Element } index Component
 */
function Event({db}:{db: Firestore}): JSX.Element
{
    const [events, setEvents] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);
    
    getDocs(query(collection(db, "events"), where("registration", "==", true)))
        .then((snapshot) => setEvents(snapshot.docs))
        .catch((error) => console.error(error));

    return (
        <>
            <div className="navbar">
                <h1 className="headline">Saturday Hack Night</h1> 
                <hr className="line"></hr>
                <p className="subhead">Upcoming Events</p>
            </div>
            <div>
                {events.map((doc, i) => <ActionAreaCard key={i} doc={doc} db={db} />)}
            </div>
        </>
    );
}

export default Event;
