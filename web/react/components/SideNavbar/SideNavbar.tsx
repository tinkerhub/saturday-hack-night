import "./SideNavbar.css";
import fallbackUser from "../../../assets/fallbacks/user.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faCalendar, faUser, faTrophy, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { User, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
function SideNavbar() 
{
    const [user, setUser] = useState<User | null>(null);
    const sideBar = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    useEffect(()=> 
    {
        onAuthStateChanged(auth, async (authUser) => 
        {
            if (authUser) 
            
                setUser(authUser);
            
            else 
            {
            //    navigate('/');
            }
        });
    }, []);
    library.add(faBars, faCalendar, faTrophy, faUser, faSignOutAlt);
    return (
        <>
            <div className="sidebar" ref={sideBar}>
                <div className="logo_content">
                    <div className="logo">
                            Saturday HackNight
                    </div>
                    <FontAwesomeIcon id="btn" icon="bars" onClick={()=>
                    {
                        sideBar.current?.classList.toggle("active");
                    }}/>
                </div>
                <ul className="navList">
                    <li>
                        <NavLink to="events" className="sideNavItem">
                            <FontAwesomeIcon className="icon" icon="calendar"/>
                            <span className="links_name">
                            Events
                            </span>
                        </NavLink>
                        <span className="tooltip">Events</span>
                    </li>
                    <li>
                        <NavLink to="" className="disabled">
                            <FontAwesomeIcon className="icon" icon="trophy"/>
                            <span className="links_name">
                            Leaderboard
                            </span>
                        </NavLink>
                        <span className="tooltip">Leaderboard</span>
                    </li>
                    <li>
                        <NavLink to="profile" className="sideNavItem">
                            <FontAwesomeIcon className="icon" icon="user"/>
                            <span className="links_name">
                            Profile
                            </span>
                        </NavLink>
                        <span className="tooltip">Profile</span>
                    </li>
                </ul>
                <div className="profile_content">
                    <div className="profile">
                        <div className="profileDetails">
                            <img src={fallbackUser} alt="user" />
                            <div className="name_email">
                                <div className="name">{user?.displayName}</div>
                                <div className="email">{user?.email}</div>
                            </div>
                        </div>
                        <FontAwesomeIcon className="logoutBtn" icon="sign-out-alt" onClick={()=> 
                        {
                            signOut(auth);
                            navigate("/");
                        }}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideNavbar;
