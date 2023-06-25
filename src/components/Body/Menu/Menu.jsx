import MenuButton from "./MenuButton";
import { faBasketShopping, faBoxesStacked, faCartFlatbed, faClipboardList, faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Menu() {
  return (
    <div className="flex flex-row mx-2 mt-5 mb-5">
      <MenuButton
        text="Sales"
        path="sales"
        icons={
          <FontAwesomeIcon icon={faBasketShopping} className="w-28 h-28" />
        }
      />
      <MenuButton
        text="Products"
        path="product"
        icons={
          <FontAwesomeIcon icon={faCartFlatbed} className="w-28 h-28" />
        }
      />
      <MenuButton
        text="Inventory"
        path="inventory"
        icons={
          <FontAwesomeIcon icon={faBoxesStacked} className="w-28 h-28" />
        }
      />
      <MenuButton
        text="Reports"
        path="reports"
        icons={
          <FontAwesomeIcon icon={faClipboardList} className="w-28 h-28" />
        }
      />
      <MenuButton
        text="Utilities"
        path="utilities"
        icons={
          <FontAwesomeIcon icon={faGear} className="w-28 h-28" />
        }
      />
    </div>
  )
}
