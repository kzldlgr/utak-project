import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubMenuButton from "./SubMenuButton";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useLocation } from "react-router-dom";
import SubMenuList from "../../../helpers/SubMenuList";

export default function SubMenu() {
  const location = useLocation();
  const SubList = SubMenuList.find(arr => arr.menu == location.pathname);

  return (
    <div className='flex flex-col mx-2 '>
      <label className="text-2xl font-bold text-center">{location && location.pathname.replace('/ninongs/', "").toUpperCase()}</label>
      <div className='flex flex-row mx-2 mt-5 mb-5'>
        {SubList && SubList.submenu.map((menu, index) => {
          return (
            <SubMenuButton
              text={menu.text}
              path={menu.path}
              key={index}
              icons={
                <FontAwesomeIcon icon={faWallet} className='w-28 h-28' />
              }
            />
          )
        })}
        <Outlet />
      </div>
    </div>
  )
}
