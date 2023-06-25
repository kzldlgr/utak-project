import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import { UserContext } from "../../../../context/UserContext"
import { db } from '../../../../firebase'
import { ref, set } from "firebase/database"
import { generateSku } from '../../../../helpers/Helpers'

// eslint-disable-next-line react/prop-types
export default function AddCategory() {
  const [category, setCategory] = useState("");
  const { setToggleAddCat } = useContext(UserContext);

  const addCategory = () => {
    const sku = generateSku();
    set(ref(db, 'Ninongs/category/' + sku), {
      name: category,
      sku: sku,
    })
    setCategory("");
    setToggleAddCat(false)
  }

  return (
    <div className='absolute inset-0 w-96 h-32 mx-auto my-44 text-center flex flex-col px-4 pt-1 gap-2 bg-white rounded-2xl shadow-xl'>
      <div className='absolute -top-0 right-1'>
        <FontAwesomeIcon icon={faXmarkCircle} onClick={() => setToggleAddCat(false)} />
      </div>
      <div className="mb-2">
        <h1 className='text-xl font-bold border-b-slate-600 border-b p-2'>New Category</h1>
      </div>
      <div className='flex flex-row gap-2'>
        <input
          type="text"
          value={category}
          onChange={(e) => { setCategory(e.target.value) }}
          placeholder='Category name'
          className=' w-[70%] border-2 p-1'
        />
        <button className=' p-2 w-[30%] rounded-2xl font-bold bg-[#FD904D] active:scale-[0.95] text-md' onClick={addCategory}>Add</button>
      </div>
    </div>
  )
}
