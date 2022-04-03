import { collection, Firestore, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Dialog, Accordion, AccordionDetails, AccordionSummary, DialogTitle, DialogContent, DialogActions, Typography, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell, Link, Button, Chip, Avatar, Stack, Table } from "@mui/material";
import  ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ResultsModalProps{
    open: boolean;
    setOpenResults: Dispatch<SetStateAction<boolean>>;
    id: string;
    db: Firestore;
}

const ProjectStatus = [
    {code:101, status:"Best Overall Project"},
    {code:102, status:"Best Group Projects"},
    {code:100, status:"Best Individual Projects"},
    {code:50, status:"Completed Projects"}
];

/**
 * Component to show the results modal.
 *
 * @author N Anbarasu
 * @returns { JSX.Element } index Component
 */

function ResultsModal({open, setOpenResults, id, db}: ResultsModalProps) : JSX.Element
{
    const [projects, setProjects] = useState([]);

    useEffect(() => 
    {
        getDocs(query(collection(db, `events/${id}/teams`), where("projectStatus", ">", -1))).then((snapshot) => 
        {
            snapshot.docs.map((value) => 
            {
                let memberList = value.get("members").concat([value.get("lead")]);
                memberList = [...new Set(memberList)];                
                setProjects((projects) => [...projects, {name: value.get("name"), repo: value.get("repo"), projectStatus: value.get("projectStatus"), members:memberList} ]);
            });
        }).catch(err => console.log(err));
    }, [id, db]);

    return(
        <Dialog maxWidth="md" fullWidth open={open} onClose={() => setOpenResults(false)}>
            <DialogTitle>Results</DialogTitle>
            <DialogContent>
                {
                    ProjectStatus.map((value) => 
                    {
                        const project = projects.filter((item) => item.projectStatus === value.code);
                        return ((project.length > 0) && <ResultsAccordion key={value.code} db={db} projects={project} projectStatus={value.status}/>);
                    })
                }
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={() => setOpenResults(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ResultsModal;

function ResultsAccordion({projects, projectStatus, db}) : JSX.Element
{
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>{projectStatus}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper} sx={{my:2 }}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ width:"100%" }}>
                                <TableCell align="center">Team Name</TableCell>
                                <TableCell align="center">Project Link</TableCell>
                                <TableCell align="center">Team Members</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                projects.map((value) =>
                                {
                                    return (
                                        <TableRow key={value.name}>
                                            <TableCell align="center">
                                                {value.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Link href={value.repo}>Project Repo</Link>
                                            </TableCell>
                                            <TableCell align="center">
                                                <MemberStack db={db} members={value.members} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
}

function MemberStack({members, db}) :JSX.Element
{
    const [users, setUsers] = useState([]);
    useEffect(()=>
    {
        members.map((value) => 
        {
            getDoc(doc(db, `users/${value}`)).then((snap) => 
            {
                const member = {name:snap.get("name"), avatar:snap.get("avatar"), github:snap.get("githubID")};
                setUsers((users) => [...users, member]);
            }).catch((err)=>console.log(err));
        });
    }, [db, members]);
    return(
        <Stack direction="row" spacing={1} alignContent="center">
            {
                users.map((item, key) =>
                    (<Chip key={key} component="a" href={`https://github.com/${item.github}`} clickable label={item.github} avatar={<Avatar alt={item.github} src={item.avatar}/> } />)
                )
            }
        </Stack>
    );
}
