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

/**
 * Component input member id and verify their existence.
 *
 * @author Rohit T P
 * @returns { JSX.Element } index Component
 */
function MemberChips({db, onChange}: MemberChipsProps)
{
    const [users, setUsers] = useState("");
    const [chips, setChips] = useState<{ [key: string]: { uid?: string, avatar?: string } }>({});

    function deleteItem(chips: { [key: string]: { uid?: string, avatar?: string } }, gid: string)
    {
        if (chips[gid].uid && chips[gid].uid !== "invalid")
            onChange(chips[gid].uid, false);

        delete chips[gid];
        return chips;
    }

    async function addUser()
    {
        const gitHubIds = users.replaceAll(/\s/g, "").split(",");
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
                if (!snap.empty && snap.docs[0] && snap.docs[0].id)
                {
                    user = {uid: snap.docs[0].id, avatar: snap.docs[0].get("avatar")};
                    onChange(snap.docs[0].id, true);
                }
                else
                    user = {uid: "invalid"};

                setChips((chips) => ({...chips, [gid]: user}));
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
                {Object.keys(chips).map((gid) =>
                    <Tooltip title={chips[gid].uid === "invalid" ? "Not Found" : ""} key={gid}>
                        <Chip
                            style={{marginTop: "1rem"}}
                            avatar={chips[gid].avatar ? <Avatar alt={gid} src={chips[gid].avatar}/> :
                                <Avatar>{gid.charAt(0)}</Avatar>}
                            color={chips[gid].uid === "invalid" ? "secondary" : chips[gid].uid ? "primary" : undefined}
                            label={gid}
                            onDelete={() => setChips((chips) => deleteItem(chips, gid))}
                        />
                    </Tooltip>
                )}
            </Stack>
        </>
    );
}

export default MemberChips;
