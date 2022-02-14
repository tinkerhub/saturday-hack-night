import SideNavbar from "../../components/SideNavbar/SideNavbar";
import { Outlet } from 'react-router-dom';
import './dashboard.css'
function Dashboard() {
    return(
        <div className="dashboard">
            <SideNavbar/>
            <div className="outlet">
                <Outlet/>
            </div>
        </div>
    )
}
export default Dashboard;