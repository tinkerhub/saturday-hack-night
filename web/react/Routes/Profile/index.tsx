import {DocumentData, Firestore, getDoc, doc, updateDoc, DocumentSnapshot} from "firebase/firestore";
import {Auth, GithubAuthProvider, signInWithPopup} from "firebase/auth";

import React, {useEffect, useState} from "react";

import {Autocomplete, Container, Snackbar, TextField} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import {getParams} from "../../utils";
import {useNavigate, useLocation} from "react-router-dom";


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

const districts = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Kottayam",
    "Alappuzha",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
    "Other",
];
const tempCampus = [{"id":"1-7001613899", "name":"school of ocean engineering and underwater technology", "address":"kerala university of fisheries and ocean studies campus, panangad p.o,", "type":"government"}];
interface userData {
    phno: string;
    email: string;
    district: string;
}
const toTitleCase = str => str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase()+m2.toLowerCase());

function Profile({auth, db}: ProfileProps): JSX.Element
{
    const [user, setUser] = useState<DocumentSnapshot<DocumentData> | null>(null);
    const [data, setData] = useState<userData>({phno: "", email: "", district: ""});
    const [campus, setCampus] = useState({id: "", name: ""});
    const [error, setError] = useState({phno: false, email: false, district: false, campusID: false});
    const [campuses, setCampuses] = useState(tempCampus);
    const [status, setStatus] = useState(0);
    const {back} = getParams(useLocation().search);
    const navigate = useNavigate();

    useEffect(() => 
    {
        let loading = true;
        fetchCampus(data.district);
        return () => 
        {
            loading = false;
        };
        async function fetchCampus(district: string)
        {
            const req = await fetch(`https://us-central1-educational-institutions.cloudfunctions.net/getCollegeByDistrict?district=${district}`);
            const res = await req.json();
            if(!loading)  return; 
            if (res) setCampuses(res);
        }
    }, [data.district]);

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
                setData({phno: snap.get("phno"), email: snap.get("email"), district: snap.get("district") || ""});
                setCampus({id: snap.get("campusID") || "", name: snap.get("campusName") || ""});
            }
        });

    }, [auth, db]);

    function SaveDetails()
    {
        if (!data.email || !data.email.match(/^\S+@\S+\.\S+$/gi))
            return setError((error) => ({...error, email: true}));

        if (!data.phno || !data.phno.match(/^(\+\d{1,3})?\d{10}$/g))
            return setError((error) => ({...error, phno: true}));

        if (!data.district || !districts.includes(data.district))
            return setError((error) => ({...error, district: true}));
        if (data.district === "Other")
            setCampus({name: "", id: ""});
        if (!user)
            return;

        setError({phno: false, email: false, district: false, campusID: false});
        updateDoc(user.ref, {
            phno: data.phno,
            email: data.email,
            district: data.district,
            campusID: campus.id,
            campusName: campus.name,
        })
            .then(() => setStatus(1))
            .then(() => back && navigate(back))
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
                <Autocomplete 
                    disablePortal
                    options={districts}
                    value={data.district}
                    onChange={(_event, value) => setData((data) => 
                    {
                        if (value)
                            return {...data, district: value};
                        return {...data, district: ""};
                    })}
                    renderInput={(params) => <TextField {...params} 
                        sx={{marginBottom: "1.1rem", marginTop: "1.1rem"}}
                        helperText={error.district ? "Please select a valid district" : ""}
                        label="District" />}
                />
                {
                    data.district !== "Other" && data.district !== "" &&
                <Autocomplete
                    disablePortal
                    options={campuses}
                    getOptionLabel={(option) => toTitleCase(option.name)}
                    value={campus}
                    onChange={(_event, value) => setCampus(() =>
                    {
                        if (value)
                            return {name: value.name, id: value.id};
                        return {name: "", id: ""};
                    })}
                    renderInput={(params) => <TextField {...params}
                        sx={{marginBottom: "1.1rem", marginTop: "1.1rem", textTransform: "uppercase"}}
                        helperText={error.campusID ? "Please select a valid campus" : ""}
                        label="Campus" />}
                />
                }
                
                <Button variant="contained" onClick={SaveDetails}>Save</Button>
            </Paper>
        </Container>
    );
}

export default Profile;

