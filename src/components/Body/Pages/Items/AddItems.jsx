import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { validate, generateSku } from '../../../../helpers/Helpers'
import { ref, set } from "firebase/database";
import { db } from "../../../../firebase";
import { useParams } from "react-router-dom";

export default function AddItems() {

  const { setToggleAddItems } = useContext(UserContext)
  const initialValues = { name: "", cost: "", price: "", options: "", stock: "" }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const params = useParams();
  const categoryId = params.catId;

  console.log(formErrors)

  console.log(validate(formValues))
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const sku = generateSku();
    let invalidItem = setFormErrors(validate(formValues));
    if (!invalidItem) {
      set(ref(db, `Ninongs/category/${categoryId}/items/` + sku), {
        name: formValues.name,
        cost: formValues.cost,
        price: formValues.price,
        options: formValues.options,
        stock: formValues.stock,
        sku: sku,
      })
    }
  }

  return (
    <div className="absolute inset-0 w-96 h-96 mx-auto my-20 text-center flex flex-col px-4 pt-1 gap-2 bg-white rounded-2xl shadow-xl">
      <div className='absolute -top-0 right-1'>
        <FontAwesomeIcon icon={faXmarkCircle} onClick={() => setToggleAddItems(false)} />
      </div>
      <div className="mb-2">
        <h1 className='text-xl font-bold border-b-slate-600 border-b p-2'>New Item</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <input
            type="text"
            name='name'
            value={formValues.name}
            onChange={handleChange}
            placeholder='Item name'
            className=' w-[70%] border-2 p-1'
          />
          <input
            type="text"
            name='cost'
            value={formValues.cost}
            onChange={handleChange}
            placeholder='Cost'
            className=' w-[70%] border-2 p-1'
          />
          <input
            type="text"
            name='price'
            value={formValues.price}
            onChange={handleChange}
            placeholder='Price'
            className=' w-[70%] border-2 p-1'
          />
          <input
            type="text"
            name='stock'
            value={formValues.stock}
            onChange={handleChange}
            placeholder='Stock'
            className=' w-[70%] border-2 p-1'
          />
          <button className=' p-2 w-[30%] rounded-2xl font-bold bg-[#FD904D] active:scale-[0.95] text-md' >Add</button>
        </div>
      </form>
    </div >
  )
}
