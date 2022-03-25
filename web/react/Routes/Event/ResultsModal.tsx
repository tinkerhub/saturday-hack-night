import { collection, Firestore, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import { useEffect, useState, Dispatch } from "react";
import { Dialog, DialogTitle, DialogContent,  DialogActions, Typography, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell, Link, Button } from "@mui/material";

interface ResultsModalProps{
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    id: string;
    db: Firestore;
}
interface ProjectData{
    name: string;
    repo: string;
    projectStatus: number;
    members: Array<string>;
}

const ProjectStatus = [
    {code:101, status:"Best Overall Project"},
    {code:100, status:"Best Individual Project"},
    {code:102, status:"Best Group Project"},
    {code:50, status:"Completed Projects"},
];

function ResultsModal({open, setOpen, id, db}: ResultsModalProps) 
{
    const [projects, setProjects] = useState<Array<ProjectData>>([]);
    useEffect(() => 
    {
        getDocs(query(collection(db, `events/${id}/teams`), where("projectStatus", ">", -1))).then((snapshot) => 
        {
            snapshot.docs.map((value) => 
            {
                const members = [];
                value.get("members").map((value) => 
                {
                    getDoc(doc(db, `users/${value}`)).then((snap) => 
                    {
                        const member = {name:snap.get("name"), avatar:snap.get("avatar"), github:`https://github.com/${snap.get("githubID")}`};
                        members.push(member);
                    }).catch((err)=>console.log(err));
                });
                setProjects(projects.concat([{name: value.get("name"), repo: value.get("repo"), projectStatus: value.get("projectStatus"), members:members}]));
            });
        }).catch(err => console.log(err));
        console.log(projects);
    }, [id]);

    return(
        <>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
                <DialogTitle>Results</DialogTitle>
                <DialogContent>
                    {
                        ProjectStatus.map((value, key) => 
                        {
                            const project = projects.filter((item) => item.projectStatus === value.code);
                            {
                                return ((project.length > 0) && <Table key={key} projects={project} projectStatus={value.status} />);
                            }
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ResultsModal;

const Table = ({projects, projectStatus}) => 
{
    return(
        <>
            <Typography variant="h7">
                {projectStatus}
            </Typography>
            <TableContainer component={Paper} sx={{my:2 }}>
                <TableHead>
                    <TableRow style={{ width:"100%" }}>
                        <TableCell>Team Name</TableCell>
                        <TableCell align="right">Project Link</TableCell>
                        <TableCell align="right">Team Members</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        projects.map((value, key) => 
                        {
                            return (
                                <TableRow key={key}>
                                    <TableCell>
                                        {value.name}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={value.repo}>Project Repo</Link>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            value.members.map((value) => 
                                            {
                                                return (
                                                    `${value.name}, `
                                                );
                                            })
                                        }
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </TableContainer>
        </>
    );
};
