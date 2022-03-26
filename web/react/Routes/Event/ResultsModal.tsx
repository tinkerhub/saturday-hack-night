import { collection, Firestore, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import { useEffect, useState, Dispatch } from "react";
import { Dialog, Accordion, AccordionDetails, AccordionSummary, DialogTitle, DialogContent, DialogActions, Typography, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell, Link, Button, Chip, Avatar, Stack, Table } from "@mui/material";
import  ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface ResultsModalProps{
    open: boolean;
    setOpenResults: Dispatch<React.SetStateAction<boolean>>;
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
    {code:102, status:"Best Group Projects"},
    {code:100, status:"Best Individual Projects"},
    {code:50, status:"Completed Projects"}
];

function ResultsModal({open, setOpenResults, id, db}: ResultsModalProps) 
{
    const [projects, setProjects] = useState<Array<ProjectData>>([]);

    useEffect(() => 
    {
        getDocs(query(collection(db, `events/${id}/teams`), where("projectStatus", ">", -1))).then((snapshot) => 
        {
            snapshot.docs.map((value) => 
            {
                const members = [];
                let memberList = value.get("members").concat([value.get("lead")]);
                memberList = [...new Set(memberList)];                
                memberList.map((value) => 
                {
                    getDoc(doc(db, `users/${value}`)).then((snap) => 
                    {
                        const member = {name:snap.get("name"), avatar:snap.get("avatar"), github:snap.get("githubID")};
                        members.push(member);
                    }).catch((err)=>console.log(err));
                });

                setProjects((projects) => [...projects, {name: value.get("name"), repo: value.get("repo"), projectStatus: value.get("projectStatus"), members:members} ]);
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
                        {
                            return ((project.length > 0) && <ResultsAccordion key={value.code} projects={project} projectStatus={value.status}/>);
                        }

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

const ResultsAccordion = ({projects, projectStatus}) => 
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
                                                <Stack direction="row" spacing={1} alignContent="center">
                                                    {
                                                        value.members.map((item, key) =>
                                                        {
                                                            return (
                                                                <Chip key={key} component="a" href={`https://github.com/${item.github}`} clickable label={item.github} avatar={<Avatar alt={item.github} src={item.avatar}/> } />
                                                            );
                                                        })
                                                    }
                                                </Stack>
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
};
