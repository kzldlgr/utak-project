import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { validate, generateSku } from '../../../../helpers/Helpers'
import Variant from '../../../../helpers/Variant'
import { ref, set } from "firebase/database";
import { db } from "../../../../firebase";
import { useParams } from "react-router-dom";
import Variants from "./Variants";

export default function AddItems() {

  const { setToggleAddItems } = useContext(UserContext)
  const initialValues = { name: "", cost: "", price: "", options: "none", stock: "" }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const params = useParams();
  const categoryId = params.catId;
  const variantArray = Variant.find((vari) => {
    if (vari.options === formValues.options) {
      return vari
    }
  })

  console.log(formValues)
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
    <div className="absolute inset-0 max-h-max w-full max-w-sm mx-auto px-4 mt-24 py-4 bg-white rounded-2xl shadow-xl">
      <div className="absolute top-0 right-0 mt-1 mr-1">
        <FontAwesomeIcon icon={faXmarkCircle} onClick={() => setToggleAddItems(false)} />
      </div>
      <div className="mb-2">
        <h1 className="text-xl font-bold border-b border-slate-600 p-2 text-center">New Item</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <label className="text-lg font-bold w-40 p-1">Item Name:</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-full border-2 p-1 rounded-xl"
            />
          </div>
          <div className="flex flex-row justify-between">
            <label className="text-lg font-bold w-36 p-1">Item Cost:</label>
            <input
              type="text"
              name="cost"
              value={formValues.cost}
              onChange={handleChange}
              placeholder="Cost"
              className="w-3/12 border-2 p-1 rounded-xl"
            />
          </div>
          <div className="flex flex-row justify-between">
            <label className="text-lg font-bold w-44 p-1">Item Stocks:</label>
            <input
              type="text"
              name="stock"
              value={formValues.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-3/12 border-2 p-1 rounded-xl"
            />
          </div>

          <div className="flex flex-col px-6">
            <label className="text-lg font-bold p-1">Variant</label>
            <div className="radio-input">
              <label>
                <input type="radio" onChange={handleChange} name="options" value="none" defaultChecked />
                <span>None</span>
              </label>
              <label>
                <input type="radio" onChange={handleChange} name="options" value="sizes" />
                <span>Sizes</span>
              </label>
              <label>
                <input type="radio" onChange={handleChange} name="options" value="quantity" />
                <span>Quantity</span>
              </label>
              <span className="selection"></span>
            </div>
            {formValues.options == "none" ?
              <div className="flex flex-row justify-between">
                <label className="text-lg font-bold p-1">Item Price:</label>
                <input
                  type="text"
                  name="price"
                  value={formValues.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-3/12 border-2 p-1 rounded-xl"
                />
              </div> :
              variantArray.opt.map((variant, index) => {
                return <div className="flex flex-row justify-between" key={index}>
                    <Variants 
                      text={variant}
                      onPriceChange={(newPrice) =>
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          options: [...newPrice, newPrice],
                        }))
                      }
                      name={formValues.options}
                    />
                </div>
              })
            }

          </div>
          <button className="px-4 py-2 w-1/3 text-md font-bold rounded-2xl bg-[#FD904D] active:scale-[0.95]">
            Add
          </button>
        </div>
      </form >
    </div >
  )
}
