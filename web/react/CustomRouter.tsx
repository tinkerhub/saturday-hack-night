import React, {Fragment} from "react";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from "react-router-dom";
import { auth } from "./firebase";
import Dashboard from "./routes/Dashboard/Dashboard";
import Events from "./routes/Dashboard/Events/Events";
import Leaderboard from "./routes/Dashboard/Leaderboard/Leaderboard";
import Profile from "./routes/Dashboard/Profile/Profile";
import Home from "./routes/Home/home";
import Join from "./routes/Join/Join";

const NotFound = () => <h1>Error 404</h1>;
function PrivateRoute() 
{
    const isLoggedIn = true;
    return isLoggedIn ? <Outlet/> : <Navigate to="/"/>;
}

const CustomRouter = () => 
{
    return (
        <Router>
            <Fragment>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/dashboard' element={<PrivateRoute/>}>
                        <Route path='/dashboard' element={<Dashboard/>}>
                            <Route path='' element={<Events/>}/>
                            <Route path='events' element={<Events/>}/>
                            <Route path='leaderboard' element={<Leaderboard/>}/>
                            <Route path='profile' element={<Profile/>}/>
                        </Route>
                    </Route>
                    <Route path='/join' element={<Join/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Fragment>
        </Router>
    );
};

export default CustomRouter;
