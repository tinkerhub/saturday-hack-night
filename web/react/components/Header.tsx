import {Auth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, User, signOut} from "firebase/auth";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import {List, ListItemIcon, ListItemText, SwipeableDrawer} from "@mui/material";


const TITLES: { [key: string]: string } = {
    "/": "Saturday Hack Night",
    "/event": "Upcoming Events",
    "/join": "Join Team"
};

function SideDrawer({drawer, setDrawer}: { drawer: boolean, setDrawer: Dispatch<SetStateAction<boolean>> })
{
    const history = useHistory();

    function closeAndGo(path: string)
    {
        setDrawer(false);
        history.push(path);
    }

    return (
        <SwipeableDrawer
            anchor="left"
            open={drawer}
            onClose={() => setDrawer(false)}
            onOpen={() => setDrawer(true)}
        >
            <Box
                sx={{width: 250}}
                role="presentation"
                onClick={() => setDrawer(false)}
            >
                <List>
                    <ListItem button onClick={() => closeAndGo("/")}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                    <ListItem button onClick={() => closeAndGo("/event")}>
                        <ListItemIcon>
                            <EventIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Events"}/>
                    </ListItem>
                </List>
            </Box>
        </SwipeableDrawer>
    );
}

/**
 * It houses top navbar and user profile.
 *
 * @author Rohit T P
 * @returns { JSX.Element } Header Component
 */
function Header({auth}: { auth: Auth })
{
    const [user, setUser] = useState<User | null>(null);
    const [title, setTitle] = useState("Home");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawer, setDrawer] = useState(false);

    const history = useHistory();
    const provider = new GithubAuthProvider();

    useEffect(() => onAuthStateChanged(auth, setUser), [auth]);

    useEffect(() => setTitle(TITLES[history.location.pathname]), [history.location.pathname]);

    return (
        <Box sx={{flexGrow: 1}}>
            <SideDrawer drawer={drawer} setDrawer={setDrawer}/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={() => setDrawer(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {title}
                    </Typography>
                    {user ? (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                color="inherit"
                            >
                                <Avatar src={user.photoURL || undefined} alt={user.displayName || undefined}/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={() => signOut(auth).then(() => setAnchorEl(null))}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : <Button color="inherit" onClick={() => signInWithPopup(auth, provider)}>SignIn</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
