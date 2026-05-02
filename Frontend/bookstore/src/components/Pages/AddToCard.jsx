import { useState } from "react";

const AddToCard = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-500 p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center transform transition hover:scale-105">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-fuchsia-700 mb-2">
          The Hunger Games
        </h1>
        <h2 className="text-xl text-gray-600 mb-4">Price: $19.99</h2>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={decreaseQuantity}
            className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:scale-110 transition"
          >
            -
          </button>

          <input
            type="text"
            value={quantity}
            readOnly
            className="w-16 text-center border-2 border-fuchsia-500 rounded-lg text-xl font-semibold"
          />

          <button
            onClick={increaseQuantity}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:scale-110 transition"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-gradient-to-r from-fuchsia-600 via-pink-500 to-purple-600 text-white py-3 rounded-lg font-bold shadow-lg hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCard;
