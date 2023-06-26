
// eslint-disable-next-line react/prop-types
export default function Variants({ text, price, onPriceChange }) {
  
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    onPriceChange(newPrice);
  };

  return (
    <div className="flex flex-row justify-between">
      <label className="text-lg font-bold p-1">{text} price:</label>
      <input
        type="text"
        name={price}
        value={price}
        onChange={handlePriceChange}
        placeholder="Price"
        className="w-3/12 border-2 p-1 rounded-xl"
      />
    </div>
  )
}
