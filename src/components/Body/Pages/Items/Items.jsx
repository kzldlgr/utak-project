import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddItems from "./AddItems";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { sortArray } from "../../../../helpers/Helpers";
import ItemButton from "./ItemButton";
import Logo from '../../../../assets/images/logo-transparent.png'
import { onValue, ref } from "firebase/database";
import { db } from "../../../../firebase";
import { Outlet, useParams } from "react-router-dom";


export default function Items() {
  const params = useParams();
  const categoryId = params.catId
  const { toggleAddItems, setToggleAddItems, categories } = useContext(UserContext)
  const [itemList, setItemList] = useState([]);
  const categoryName = categories.find((catId) => {
    if (catId.categoryId == categoryId) {
      return catId.name
    }
  });


  useEffect(() => {
    setToggleAddItems(false)
    const databaseRef = ref(db, `Ninongs/category/${categoryId}/items`);

    onValue(databaseRef, (snapshot) => {
      setItemList([])
      const data = snapshot.val();
      if (data !== null) {
        const itemsArray = Object.values(data);
        setItemList((previtems) => {
          const uniqueitems = [...previtems, ...itemsArray];
          return uniqueitems;
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col mx-2 relative">
        <label className="text-2xl font-bold text-center">{categoryName && categoryName.name}</label>
        <div className='flex flex-row mx-2 mt-5 mb-5' >
          {itemList && sortArray(itemList).map((item, index) => {
            return <div className='flex flex-row mx-2' key={index}>
              <ItemButton
                text={item.name}
                path={item.sku}
                icons={Logo}
              />
            </div>
          })}
          <div className="w-44 h-44 text-center shadow-2xl mx-2 rounded-2xl p-4 focus:bg-[#FD904D] hover:bg-[#FD904D] ease-in-out duration-600 active:scale-[0.95]" >

            <div className="relative items-center cursor-pointer" onClick={() => setToggleAddItems(true)}>
              <FontAwesomeIcon icon={faPlusCircle} className='w-20 h-20 p-4' />
            </div>
            <p className="text-lg font-bold whitespace-nowrap">New Item</p>
          </div>
        </div>
      </div>
      {toggleAddItems && <AddItems />}
      {categoryId && <Outlet />}
    </>
  )
}
