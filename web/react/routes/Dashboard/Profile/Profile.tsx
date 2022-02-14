import "./Profile.css";
import "react-toastify/dist/ReactToastify.css";
import fallbackUser from "../../../../assets/fallbacks/user.png";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { getDoc, doc, DocumentData, DocumentSnapshot, updateDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
function Profile() 
{
    const [user, setUser] = useState<DocumentSnapshot<DocumentData> | null>(null);
    const [data, setData] = useState({phno: "", email: ""});

    useEffect(()=>
    {
        auth.onAuthStateChanged(async (authUser) =>
        {
            if (!authUser)
                signInWithPopup(auth, new GithubAuthProvider());
            else
            {
                const snap = await getDoc(doc(db, `users/${authUser.uid}`));
                setUser(snap);
                setData({phno: snap.get("phno"), email: snap.get("email")});
            }
        });
    }, []);
    function SaveDetails()
    {
        if (!data.email || !data.email.match(/^\S+@\S+\.\S+$/gi))
        {
            console.log("Email err");
            toast.error("Invalid Email ID", {
                position:"top-right"
            });
            return;
        }
        if (!data.phno || !data.phno.match(/^(\+\d{1,3})?\d{10}$/g))
        {
            console.log("Num err");
            toast.error("Invalid Phone Number");
            return;
        }
        if (!user)
            return;
        updateDoc(user.ref, data).then(()=>
        {
            toast.success("Updated", {
                position:"top-right"
            });
        });
    }
    return(
        <>
            <div className="profileHeader">
                Profile
            </div>
            <div className="profileContainer">
                <div className="profileDetails">
                    <img className="userAvatar" src={user?.get("avatar")? user?.get("avatar"):fallbackUser} alt="User"/>
                    <li/>
                    <input className="inputField" placeholder="Email" type="email" value={data.email} onChange={ ({target}) => setData((data) => ({...data, email: target.value}))}/>
                    <li/>
                    <input className="inputField" placeholder="PhoneNumber" type="phone" value={data.phno} onChange={({target}) => setData((data) => ({...data, phno: target.value}))}/>
                    <li/>
                    <button className="btnSave" onClick={SaveDetails}>Save</button>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

export default Profile;
