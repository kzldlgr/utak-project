import { faTrashCan, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onValue, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../../firebase";
import Variant from "../../../../helpers/Variant";
import Swal from "sweetalert2";

export default function EditItems() {
  const navigate = useNavigate();
  const params = useParams();
  const [itemDetails, setItemDetails] = useState({
    name: '',
    cost: '',
    price: '',
    options: { type: 'none', variant: {} },
    stock: ''
  });
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemStock, setItemStock] = useState("");
  const [variant, setVariant] = useState("");
  const [price, setPrice] = useState("");
  const [opt, setOpt] = useState("");
  const optionsValue = { type: variant, variant: opt };
  const variantArray = Variant.find(vari => vari.type === variant);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-green-500 p-2 text-white rounded-xl font-bold mx-1',
      cancelButton: 'bg-red-500 p-2 text-white rounded-xl font-bold mx-1'
    },
    buttonsStyling: false
  })

  useEffect(() => {
    const databaseRef = ref(db, `Ninongs/category/${params.catId}/items/${params.itemId}`);
    onValue(databaseRef, snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        setItemDetails(data);
        setItemName(data.name || "");
        setItemCost(data.cost || "");
        setItemStock(data.stock || "");
        setVariant(data.options.type || "");
        setPrice(data.price || "");
        setOpt(data.options.variant || "");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.itemId]);

  const handleUpdate = () => {
    update(ref(db, `Ninongs/category/${params.catId}/items/${params.itemId}`), {
      name: itemName,
      cost: itemCost,
      price: price,
      options: optionsValue,
      stock: itemStock,
    })
    navigate(`/ninongs/product/${params.catId}`, { replace: true })
    setItemDetails({
      name: '',
      cost: '',
      price: '',
      options: { type: 'none', opt: {} },
      stock: ''
    })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${itemName} item successfully updated`,
      showConfirmButton: false,
      timer: 1500
    })
  };

  const handleDelete = () => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this Item!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        remove(ref(db, `Ninongs/category/${params.catId}/items/${params.itemId}`))
        navigate(`/ninongs/product/${params.catId}`, { replace: true })
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your Item has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })
  }
  return (
    <div className="absolute inset-0 max-h-max w-full max-w-sm mx-auto px-4 mt-10 py-4 bg-white rounded-2xl shadow-xl">
      <div className="absolute top-0 right-0 mt-1 mr-1">
        <FontAwesomeIcon icon={faXmarkCircle} onClick={() => navigate(-1)} />
      </div>
      <div className="absolute top-6 left-6 mt-1 mr-1 text-red-500 cursor-pointer">
        <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete} />
      </div>
      <div className="mb-2">
        <h1 className="text-xl font-bold border-b border-slate-600 p-2 text-center">SKU: {itemDetails && itemDetails.sku}</h1>
      </div>
      <form onSubmit={handleUpdate}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <label className="text-lg font-bold w-40 p-1">Item Name:</label>
            <input
              type="text"
              name="name"
              value={itemName}
              onChange={e => setItemName(e.target.value)}
              className="w-full border-2 p-1 rounded-xl"
            />
          </div>
          <div className="flex flex-row justify-between">
            <label className="text-lg font-bold w-36 p-1">Item Cost:</label>
            <input
              type="text"
              name="cost"
              value={itemCost}
              onChange={e => setItemCost(e.target.value)}
              className="w-3/12 border-2 p-1 rounded-xl"
            />
          </div>
          <div className="flex flex-row justify-between">
            <label className="text-lg font-bold w-44 p-1">Item Stocks:</label>
            <input
              type="text"
              name="stock"
              value={itemStock}
              onChange={e => setItemStock(e.target.value)}
              className="w-3/12 border-2 p-1 rounded-xl"
            />
          </div>

          <div className="flex flex-col px-6">
            <label className="text-lg font-bold p-1 text-center">Variant</label>
            <div className="radio-input mb-2">
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="none"
                  checked={variant === "none"}
                  onChange={() => setVariant("none")}
                />
                <span>None</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="sizes"
                  checked={variant === "sizes"}
                  onChange={() => setVariant("sizes")}
                />
                <span>Sizes</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="quantity"
                  checked={variant === "quantity"}
                  onChange={() => setVariant("quantity")}
                />
                <span>Quantity</span>
              </label>
              <span className="selection"></span>
            </div>
            {variant === "none" ? (
              <div className="flex flex-row justify-between">
                <label className="text-lg font-bold p-1">Item Price:</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="Price"
                  className="w-3/12 border-2 p-1 rounded-xl"
                />
              </div>
            ) : (
              variantArray &&
              Object.keys(variantArray.variant).map((vari, index) => (
                <div className="flex flex-row justify-between" key={index}>
                  <div className="flex flex-row justify-between mt-2">
                    <label className="text-lg font-bold w-36 p-1">{vari} price:</label>
                    <input
                      type="text"
                      name={vari}
                      value={opt[vari] || ""}
                      onChange={e => setOpt(prevState => ({ ...prevState, [vari]: e.target.value }))}
                      placeholder="Price"
                      className="w-3/12 border-2 p-1 rounded-xl"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex flex-row my-2 w-full justify-center">
            <button className="px-4 py-2 w-1/3 text-md font-bold rounded-2xl bg-[#FD904D] active:scale-[0.95]">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}