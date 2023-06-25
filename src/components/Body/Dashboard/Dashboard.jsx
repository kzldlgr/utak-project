import Logo from '../../../assets/images/logo-transparent.png'
import { useLocation } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export default function Dashboard({ children }) {
  const location = useLocation();

  return (

    <div className="relative flex flex-col w-98 h-[640px] bg-[#f8f2e2] mt-2 mx-2 rounded-b-2xl shadow-xl ">
      {location.pathname === "/ninongs" ?
        <div className='flex flex-row h-full'>
          <img src={Logo} className='w-1/2 h-full px-32' />
          <div className='w-1/2 h-full py-32 px-24'>
            <div className='shadow-xl rounded-3xl py-10 px-6 flex flex-col gap-4'>
              <h1 className='text-5xl font-bold'>Summary</h1>
              <div className='w-full text-center '>
                <div className='flex flex-row justify-center border gap-1'>
                  <span className='text-2xl font-bold'>0.0</span>
                  <h1 className='border-gray-400 pt-2'>Total Sales</h1>
                </div>
                <div className='flex flex-row justify-center border gap-1'>
                  <span className='text-2xl font-bold'>0</span>
                  <h1 className='border-gray-400 pt-2'>Total Transaction</h1>
                </div>

              </div>
            </div>
          </div>
        </div>
        : <>{children}</>
      }
    </div>
  )
}
