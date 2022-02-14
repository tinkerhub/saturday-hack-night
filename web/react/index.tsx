import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { auth, db, functions } from './firebase';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectFunctionsEmulator } from 'firebase/functions';
import { Workbox } from 'workbox-window';
const wb = new Workbox("sw.js");

if ("serviceWorker" in navigator && location.hostname !== "localhost") 
    wb.register().catch((error) => console.error(error));
else
{
    connectAuthEmulator(auth, "http://localhost:9099",{disableWarnings:true});
    connectFirestoreEmulator(db, "localhost", 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
    
}

ReactDOM.render(<App/>, document.getElementById("root"));
