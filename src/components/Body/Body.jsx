import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Navbar/Navbar";
import Menu from "./Menu/Menu";
import { Outlet } from "react-router-dom";
// import SubMenu from "./SubMenu/SubMenu";


export default function Body() {

  return (
    <div>
      <Navbar />
      <div className="divide-y-4 divide-slate-400/25">
        <Menu />
        <Dashboard>
          <Outlet />
        </Dashboard>
      </div>
    </div>
  )
}
