import { getDocs, query, collection, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./MemberChips.css";
import userIcon from "../../../assets/fallbacks/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface MemberChipProps {
    onChange: (uid: string, add: boolean) => void | undefined;
}
function MemberChips({ onChange }: MemberChipProps) 
{
    const [users, setUsers] = useState<string>("");
    const [chips, setChips] = useState<{ [key: string]: { uid?: string, avatar?: string } }>({});
    library.add(faTimes);
    useEffect(()=>
    {

    }, [chips]);
    function deleteItem (chips: { [key: string]: { uid?: string, avatar?: string } }, gid: string):any
    {
        if (chips[gid].uid && chips[gid].uid !== "invalid")
        {
            onChange(chips[gid].uid || "", false);
            console.log("Chip Removed");
        } 
        delete chips[gid];
        return chips;
    }

    async function addUser()
    {
        const gitHubIds = users.replaceAll(/\s/g, "").split(" ");
        const newChips: { [key: string]: { uid?: string, avatar?: string } } = {};

        setUsers("");

        for (const gid of gitHubIds)
            if (!(gid in chips) && gid !== "")
                newChips[gid] = {};

        setChips((chips) => ({...chips, ...newChips}));

        for (const gid in newChips)
        
            getDocs(query(collection(db, "users"), where("githubID", "==", gid))).then((snap) =>
            {
                let user: { uid: string; avatar?: string; };
                if (snap.docs.length !== 0)
                {
                    user = {uid: snap.docs[0].id, avatar: snap.docs[0].get("avatar")};
                    onChange(snap.docs[0].id, true);
                }
                else
                    user = {uid: "invalid"};

                setChips((chips) => ({...chips, [gid]: user}));
            });
        
    }
    return(
        <>
            <input type="name" placeholder="Members" className="modalInput" onKeyUp={
                (event)=>
                {
                    if(event.key === "Enter" || event.key === ",")
                    
                        addUser();
                    
                }
            } onChange={(event)=>
            {
                setUsers(event.target.value);
            }}/>
            <div className="chipContainer">
                {
                    Object.keys(chips).map((gid)=>
                    {
                        return(
                            <div key={gid} className={chips[gid].uid === "invalid"? "invalid chip" : "valid chip"}>
                                <img src={chips[gid].avatar? chips.gId.avatar :userIcon } alt="avatar" className="avatar"/>
                                <span className="chipText">{gid}</span>
                                <span className="chipClose" onClick={()=>setChips(deleteItem(chips, gid))}>
                                    <FontAwesomeIcon className="icon" icon="times"/>
                                </span>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}
export default MemberChips;
