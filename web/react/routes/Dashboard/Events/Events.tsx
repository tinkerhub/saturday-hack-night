import { onAuthStateChanged, User } from "firebase/auth";
import { QueryDocumentSnapshot, doc, getDoc, getDocs, collection, query, where, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Card from "../../../components/Card/Card";
import { auth, db } from "../../../firebase";
import "./Events.css";
import "react-toastify/dist/ReactToastify.css";

function Events() 
{
    const [events, setEvents] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => 
    {
        onAuthStateChanged(auth, async (authUser)=>
        {
            setUser(authUser);
            if (authUser)
            {
                const snap = await getDoc(doc(db, `users/${authUser.uid}`));
                if (!snap.get("phno") || !snap.get("email"))
                    navigate("/dashboard/profile");
            }
        });
        getDocs(query(collection(db, "events"), where("registration", "==", true)))
            .then((snapshot) => setEvents(snapshot.docs))
            .catch((error) => console.error(error));

    }, [navigate]);
    return(
        <>
            <div className="eventHeader">
                Events
            </div>
            <div className="events">
                {events.map((event, i) => 
                {
                    return <Card doc={event} user={user} auth={auth} key={i}/>;
                })}
            </div>
            <ToastContainer/>
        </>
    );
}
export default Events;
