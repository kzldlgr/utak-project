import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function EditItems() {
    const navigate = useNavigate();

  const handleSubmit= () => {

  }

  return (
    <div className="absolute inset-0 w-96 h-96 mx-auto my-20 text-center flex flex-col px-4 pt-1 gap-2 bg-white rounded-2xl shadow-xl">
      <div className='absolute -top-0 right-1'>
        <FontAwesomeIcon icon={faXmarkCircle} onClick={() => navigate(-1)} />
      </div>
      <div className="mb-2">
        <h1 className='text-xl font-bold border-b-slate-600 border-b p-2'>Edit Item</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <input
            type="text"
            name='name'
            // value={formValues.name}
            // onChange={handleChange}
            placeholder='Item name'
            className=' w-[70%] border-2 p-1'
          />
          <input
            type="text"
            name='cost'
            // value={formValues.cost}
            // onChange={handleChange}
            placeholder='Cost'
            className=' w-[70%] border-2 p-1'
          />
          <input
            type="text"
            name='price'
            // value={formValues.price}
            // onChange={handleChange}
            placeholder='Price'
            className=' w-[70%] border-2 p-1'
          />
          <input
            type="text"
            name='stock'
            // value={formValues.stock}
            // onChange={handleChange}
            placeholder='Stock'
            className=' w-[70%] border-2 p-1'
          />
          <button className=' p-2 w-[30%] rounded-2xl font-bold bg-[#FD904D] active:scale-[0.95] text-md' >Add</button>
        </div>
      </form>
    </div >
  )
}
