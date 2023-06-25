import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export default function Menu({ path, text, children, icons }) {
  return (
    <Link to={path} className="w-44 h-44 text-center shadow-2xl mx-2 rounded-2xl p-4 focus:bg-[#FD904D] hover:bg-[#FD904D] ease-in-out duration-600 active:scale-[0.95]">
      <div className="relative items-center p-1">
        {icons}
      </div>
      <p className="text-lg font-bold ">{text}</p>
      {children}
    </Link>
  )
}
