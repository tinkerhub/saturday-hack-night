import { getDocs, query, collection, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import "./MemberChips.css";
import userIcon from "../../../assets/fallbacks/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface MemberChipProps {
    onChange: (uid: string, add: boolean) => void | undefined;
}
interface userData{
    gId: string;
    avatar?: string | null;
    uid: string;
}
function MemberChips({ onChange }: MemberChipProps) 
{
    
    const [users, setUsers] = useState<string>("");
    const [chips, setChips] = useState<Array<userData>> ([]);
    library.add(faTimes);
    function deleteItem (gid: string, chips:Array<userData>):Array<userData>
    {   
        const item = chips.filter((value) => value.gId === gid)[0];
        if(item && item.gId !== null)
        {
            onChange(item.uid, false);
            console.log("Chip Removed");
        }
        chips = chips.filter((value)=> value.gId !== gid);
        return chips;
    }
    async function addUser()
    {
        const gitHubIds = users.replaceAll(/\s/g, "").split(" ");
        const newChips: Array<userData> = [];
        setUsers("");
        for (const gid of gitHubIds)
        
            if(!(chips.filter((item) => item.gId === gid).length > 0) && gid !== "")
            
                newChips.push({gId: gid, avatar:"", uid:""});
            
        
        setChips(chips.concat(newChips));
        newChips.forEach((item) => 
        {
            getDocs(query(collection(db, "users"), where("githubID", "==", item.gId))).then((snap) =>
            {
                let user: userData;
                if (snap.docs.length !== 0)
                {
                    user = {gId: item.gId, uid: snap.docs[0].id, avatar: snap.docs[0].get("avatar")};
                    onChange(snap.docs[0].id, true);
                }
                else
                
                    user = {gId:item.gId, uid: "invalid"};    
                
                setChips(chips.concat(user));
            });
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
                    chips.map((user, key)=>
                    {
                        return(
                            <div key={key} className={user.uid === "invalid"? "invalid chip" : "valid chip"}>
                                <img src={user.avatar? user.avatar :userIcon } alt="avatar" className="avatar"/>
                                <span className="chipText">{user.gId}</span>
                                <span role="button" tabIndex={0} className="chipClose" onClick={()=>setChips(deleteItem(user.gId, chips))} onKeyDown={()=>setChips(deleteItem(user.gId, chips))}>
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
