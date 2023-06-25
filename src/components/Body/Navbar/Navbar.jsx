import { useEffect, useState } from 'react';
import Logo from '../../../assets/images/logo-transparent.png';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase'
import { filterName } from '../../../helpers/Helpers';

export default function Navbar() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000)
  }, [])

  const userSignOut = () => {
    signOut(auth).then(() => {
      navigate('/', { replace: true })
    })
  }

  return (
    <div
      className="flex bg-[#FD904D] p-1 items-center text-white justify-between h-16 mt-2 mx-2 shadow-lg cursor-pointer"
      onClick={() => navigate('/ninongs', { replace: true })}
    >
      <div className="flex gap-3 items-center pl-2">
        <img src={Logo} alt="logo" className="w-[4rem]" />
        <h1 className="font-bold text-2xl">Ninongs.</h1>
      </div>
      <div>
        <p className='text-md'>{time.toDateString() + " " + time.toLocaleTimeString()}</p>
      </div>
      <div className="flex flex-col bg-black w-56 px-2 py-1 rounded-md shadow-lg">
        <div className='flex flex-row cursor-default'>
          <div className='grow'>
            <h1 className="font-bold text-1xl">Cashier name:</h1>
            <h1 className="font-bold text-1xl">{auth.currentUser && filterName(auth.currentUser.email)}</h1>
          </div>
          <div className='mt-6'>
            <h1 className="font-bold text-1xl" onClick={userSignOut}>Logout</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
