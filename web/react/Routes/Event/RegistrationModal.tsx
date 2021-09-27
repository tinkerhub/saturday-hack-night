import React, {useState} from "react";
import {addDoc, collection, Firestore} from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Firebase from "firebase/compat";
import MemberChips from "./MemberChips";

interface ModalProps
{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    user: Promise<Firebase.User>;
    db: Firestore;
}

/**
 * Component to show the team registration popup.
 *
 * @author Rohit T P
 * @returns { JSX.Element } index Component
 */
function RegistrationModal({open, setOpen, id, user, db}: ModalProps)
{
    const [data, setData] = useState({name: "", repo: ""});
    const [members, setMembers] = useState(new Set());
    const [error, setError] = useState({name: false, repo: false});
    const [status, setStatus] = useState(0);

    async function createTeam()
    {
        setError({name: false, repo: false});

        if (!data.name.match(/^[a-z|1-9]+$/gi))
            return setError((error) => ({...error, name: true}));


        if (!data.repo.match(/^https:\/\/github.com\/[^\/]+\/[^\/]+$/g))
            return setError((error) => ({...error, repo: true}));

        try
        {
            const lead = (await user).uid;
            members.delete(lead);

            await addDoc(collection(db, `events/${id}/teams`), {
                name: data.name,
                repo: data.repo,
                members: Array.from(members),
                lead
            });

            setStatus(1);
        }
        catch (error)
        {
            setStatus(-1);
            console.error(error);
        }
    }

    return (
        <Dialog open={open}>
            {status === 0 ? <></> : status === -1 ?
                <Alert severity="error">Team creation failed.</Alert> :
                <Alert severity="success">Team Created !</Alert>
            }
            <DialogTitle>Create Team</DialogTitle>
            <DialogContent>
                <TextField
                    label="Team Name" fullWidth required error={error.name}
                    helperText={error.name ? "Should be alpha-numeric" : ""}
                    sx={{marginBottom: "1.1rem", marginTop: "1.1rem"}}
                    onChange={({target}) => setData((data) => ({...data, name: target.value}))}
                />
                <TextField
                    label="Repo Url" fullWidth required error={error.repo}
                    helperText={error.repo ? "Should be a valid github repo" : ""}
                    sx={{marginBottom: "1.1rem"}}
                    onChange={({target}) => setData((data) => ({...data, repo: target.value}))}
                />
                <MemberChips db={db}
                    onChange={(uid, add) => setMembers((members) => (add ? members.add(uid) : members.delete(uid), members))}/>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={createTeam}>Create</Button>
                <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RegistrationModal;
