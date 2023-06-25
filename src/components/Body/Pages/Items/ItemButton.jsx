import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ItemButton({ children, path, icons, text }) {
  return (
    <Link to={path} className="w-44 h-44 text-center shadow-2xl mx-2 rounded-2xl p-4 focus:bg-[#FD904D] hover:bg-[#FD904D] ease-in-out duration-600 active:scale-[0.95]">
      <div className="relative items-center px-4 py-1">
        <img src={icons} className='w-28' />
      </div>
      <p className="text-lg font-bold whitespace-nowrap">{text}</p>
      {children}
    </Link>
  )
}
