import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import MemberChips from "../MemberChips/MemberChips";
import "./RegistrationModal.css";
interface RegistrationModalProps {
    id: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean,
    user:User | null,
}
ReactModal.setAppElement("#root");
function RegistrationModal({id, setOpen, open, user}:RegistrationModalProps) 
{
    const [members, setMembers] = useState(new Set());  
    const [data, setData] = useState({name:"", repo:""});
    async function createTeam()
    {
        if (!data.name.match(/^[a-z|1-9]+$/gi))
        {
            toast.error("Invalid Team Name", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
            
            
        if (!data.repo.match(/^https:\/\/github.com\/[^\/]+\/[^\/]+$/g))
        {
            toast.error("Invalid Repo URL", {
            });
            return;
        }

        members.delete(user.uid);
        
        await addDoc(collection(db, `events/${id}/teams`), {
            name: data.name,
            repo: data.repo,
            members: Array.from(members),
            lead: user.uid
        }).then(()=>
        {
            toast.success("Team Created Successfully");
        }).catch(()=>
        {
            toast.error("Team Creation Failed");
        });
        
        setOpen(true);
    }
    return(
        <>
            <ReactModal style={
                {
                    overlay: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        backgroundColor: "rgba(255, 255, 255, 0.75)"
                    },
                    content: {
                        position: "relative",
                        top:"50%",
                        left:"50%",
                        transform: "translate(-50%, -50%)",
                        height:"max-content",
                        width:"max-content",
                        border: "1px solid #ccc",
                        background: "#fff",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "4px",
                        outline: "none",
                        padding: "20px"
                    }
                }
            } parentSelector={()=>document.querySelector("#root")} isOpen={open} onRequestClose={()=>setOpen(false)} shouldCloseOnOverlayClick={true}>
                <h1 className="modelHead">Create Team</h1>
                <div className="modelBody">
                    <input type="text" placeholder="Team Name" className="modalInput" onChange={({target}) => setData((data) => ({...data, name: target.value}))}/>
                    <input type="text" placeholder="Repo Name" className="modalInput" onChange={({target}) => setData((data) => ({...data, repo: target.value}))}/>
                    <MemberChips onChange={(uid, add)=> setMembers((members) => ( add ? members.add(uid) : members.delete(uid) ? members : members))}/>
                </div>
                <div className="modalFooter">
                    <button className="modalButton" onClick={()=>
                    {
                        createTeam();
                    }}>Create</button>
                    <button className="modalButton" onClick={()=>setOpen(false)}>Cancel</button>
                </div>
            </ReactModal>
        </>
    );
}
export default RegistrationModal;
