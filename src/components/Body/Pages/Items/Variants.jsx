

// eslint-disable-next-line react/prop-types
export default function Variants({ text, onPriceChange }) {
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    onPriceChange({ [name]: value });

  };
  return (
    <div className="flex flex-row justify-between mt-2">
      <label className="text-lg font-bold w-36 p-1">{text} price:</label>
      <input
        type="text"
        name={text}
        onChange={handlePriceChange}
        placeholder="Price"
        className="w-3/12 border-2 p-1 rounded-xl"
      />
    </div>
  );
}