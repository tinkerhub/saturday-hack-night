import {collection, Firestore, getDocs, query, where} from "firebase/firestore";

import {Stack, TextField} from "@mui/material";
import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

interface MemberChipsProps
{
    db: Firestore;
    onChange: (uid: string, add: boolean) => void | undefined;
}
interface userData{
    gId: string;
    avatar?: string | null;
    uid: string;
}
/**
 * Component input member id and verify their existence.
 *
 * @author Rohit T P
 * @returns { JSX.Element } index Component
 */
function MemberChips({db, onChange}: MemberChipsProps)
{
    const [users, setUsers] = useState<string>("");
    const [chips, setChips] = useState<Array<userData>> ([]);
    function deleteItem (gid: string, chips:Array<userData>):Array<userData>
    {
        const item = chips.filter((value) => value.gId === gid)[0];
        if(item && item.gId !== null)
            onChange(item.uid, false);
        chips = chips.filter((value)=> value.gId !== gid);
        return chips;
    }
    async function addUser()
    {
        const gitHubIds = users.replaceAll(/\s/g, "").split(",");
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
    return (
        <>
            <TextField
                label="Members" fullWidth
                value={users}
                onChange={({target}) => setUsers(target.value)}
                onKeyUp={({key}) => (key === "Enter" || key === ",") && addUser()}
            />
            <Stack direction="row" spacing={1} flexWrap="wrap">
                {chips.map((user, key) =>
                    <Tooltip title={user.uid === "invalid" ? "Not Found" : ""} key={key}>
                        <Chip
                            style={{marginTop: "1rem"}}
                            avatar={user.avatar ? <Avatar alt={user.gId} src={user.avatar}/> :
                                <Avatar>{user.gId.charAt(0)}</Avatar>}
                            color={user.uid === "invalid" ? "secondary" : user.uid ? "primary" : undefined}
                            label={user.gId}
                            onDelete={() => setChips((chips) => deleteItem(user.gId, chips))}
                        />
                    </Tooltip>
                )}
            </Stack>
        </>
    );
}

export default MemberChips;
