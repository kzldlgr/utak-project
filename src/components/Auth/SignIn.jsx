import { useState } from "react";
import { auth, errorFirebase } from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { filterName } from "../../helpers/Helpers";
import Swal from "sweetalert2";
import Banner from '../../assets/images/banner.jpg'

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const navigate = useNavigate();


  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          setFormErrors("")
          navigate("/ninongs", { replace: true })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Gooday! ${filterName(user.user.email)}`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }).catch((error) => {
        setFormErrors(errorFirebase[error.code])
      })
  }



  return (
    <div className='max-w-[1240px] mt-[160px] w-full h-full mx-auto bg-cover bg-no-repeat' style={{ backgroundImage: `url(${Banner})` }}>
      <div className="p-12 w-[600px] h-full">
        <form className="w-full h-[500px] py-[80px] p-4" onSubmit={signIn}>
          <div className="max-w-full flex flex-col gap-4 bg-white bg-opacity-75 p-[15px] rounded-2xl relative ">
            <h1 className="font-bold text-4xl">Login</h1>
            <div className="inputGroup">
              <label className="label">Email/Username</label>
              <input type="email"
                className="input text-white focus:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="inputGroup">
              <label className="label">Password</label>
              <input type="password"
                className="input text-white focus:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              {formErrors && <p className="mt-4 text-red-500 font-bold">{formErrors}</p>}
            </div>
            <button className="button mx-auto pt-12" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
