import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function SubMenuButton({ path, icons, text, children }) {
  return (
    <Link to={path} className="w-44 h-44 text-center shadow-2xl mx-2 rounded-2xl p-4 focus:bg-[#FD904D] hover:bg-[#FD904D] ease-in-out duration-600 active:scale-[0.95]">
      <div
        className=""
      // onClick={onMouseCilck}
      >
        <div className="relative items-center">
          {icons}
        </div>
        <p className="text-sm font-bold whitespace-nowrap">{text}</p>
      </div>
      {children}
    </Link>
  )
}
