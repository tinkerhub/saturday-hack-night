import "./Navbar.css";
import logo from "../../../assets/logo.png";
import fallbackAvatar from "../../../assets/fallbacks/user.png";
import { auth } from "../../firebase";
import { useEffect, useState, createRef } from "react";
import { onAuthStateChanged, User, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { Link } from "react-scroll";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function Navbar() 
{
    const [user, setUser] = useState<User | null>(null);
    const [toggle, setToggle] = useState<boolean>(false);
    const [userAvatar, setuserAvatar] = useState(fallbackAvatar);
    const navRef = createRef<HTMLDivElement>();
    const navigate = useNavigate();
    library.add(faBars);
    const provider = new GithubAuthProvider();
    useEffect(()=>
    {
        onAuthStateChanged(auth, async (authUser) => 
        {
            if(authUser)
            {
                setUser(authUser);
                if (authUser.photoURL) 
                
                    setuserAvatar(authUser.photoURL);
                
            }
            else 
            
                setUser(null);
            
        });
    });
    useEffect(()=>
    {
        if(toggle)
        {
            navRef.current?.classList.toggle("navLinksActive");
            navRef.current?.classList.remove("navLinks");
        }
        else
        {
            navRef.current?.classList.remove("navLinksActive");
            navRef.current?.classList.add("navLinks");
        }
    }, [toggle, navRef]);
    return(
        <>
            <div className="navbar">
                <div className='brand'>
                    <img className="brandLogo" src={logo} alt='logo' />
                    <div className='brandName'>
                        &nbsp;Saturday HackNight
                    </div>
                </div>
                <div className="navIconCon" tabIndex={0} role="button" onClick={()=>setToggle(!toggle)} onKeyPress={()=>setToggle(!toggle)}>
                    <FontAwesomeIcon icon="bars" className="navIcon" size='2x'/>
                </div>
                <div className="userStatus">
                    {
                        user?
                            <img src={ userAvatar } role="presentation" alt="user.displayName" className="userAvatar" onClick={()=>
                            {
                                signOut(auth);
                                setUser(null);
                            }} onKeyUp={()=>
                            {
                                signOut(auth);
                                setUser(null);
                            }
                            }/>
                            :
                            <button className='loginBtn' onClick={()=>
                            {
                                signInWithPopup(auth, provider).then(()=>
                                {
                                    navigate("/dashboard");
                                }); 
                            }}>
                            LOGIN
                            </button>
                    }
                </div>
                <div className='' ref={navRef}>
                    <Link className="navLink" to='home' spy={true} smooth={true} offset={-100} duration={500}>
                        HOME
                    </Link>
                    <Link className="navLink" to='about' spy={true} smooth={true} offset={-100} duration={500}>
                        ABOUT
                    </Link>
                    <Link className="navLink" to='faq' spy={true} smooth={true} offset={-100} duration={500}>
                        FAQ
                    </Link>
                    <NavLink className="navLink" to='dashboard' >
                        DASHBOARD
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Navbar;
