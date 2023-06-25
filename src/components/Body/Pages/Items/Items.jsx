import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddItems from "./AddItems";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";


export default function Items() {

  const { toggleAddItems, setToggleAddItems } = useContext(UserContext)

  console.log(toggleAddItems)
  return (
    <>
      <div className="flex flex-col mx-2 relative">
        <label className="text-2xl font-bold text-center">ITEMS</label>
        <div className='flex flex-row mx-2 mt-5 mb-5' >
          {/* {categories && sortArray(categories).map((categ, index) => {
            console.log(index)
            return <div className='flex flex-row mx-2' key={index}>
              <CategoryButton
                text={categ.name}
                path={categ.sku}
                icons={Logo}
              />
            </div>
          })} */}
          <div className="w-44 h-44 text-center shadow-2xl mx-2 rounded-2xl p-4 focus:bg-[#FD904D] hover:bg-[#FD904D] ease-in-out duration-600 active:scale-[0.95]" >

            <div className="relative items-center cursor-pointer" onClick={() => setToggleAddItems(true)}>
              <FontAwesomeIcon icon={faPlusCircle} className='w-20 h-20 p-4' />
            </div>
            <p className="text-lg font-bold whitespace-nowrap">New Item</p>
          </div>
        </div>
      </div>
      {toggleAddItems && <AddItems />}
    </>
  )
}
