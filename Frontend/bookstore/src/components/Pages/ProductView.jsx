import React from "react";
import { Link } from "react-router-dom";

const ProductView = () => {
  const product = {
    id: 1,
    sku: "SKU0001",
    title: "Fantastic Mr. Fox",
    category: "Children",
    price: 9.99,
    discountPrice: 7.99,
    stockCount: 100,
    currency: "USD",
    description:
      "A clever fox outwits three mean farmers in this Roald Dahl classic. Filled with humor, adventure, and moral lessons — perfect for young readers.",
    coverImage:
      "https://covers.openlibrary.org/b/isbn/9780140328721-L.jpg",
    backImage:
      "https://covers.openlibrary.org/b/isbn/9780140328721-M.jpg",
    productUrl: "https://openlibrary.org/isbn/9780140328721",
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-start gap-6 bg-white rounded-2xl shadow-lg p-6">

        {/* Image Section */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            className="w-64 h-80 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
            src={product.coverImage}
            alt={product.title}
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{product.category}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{product.description}</p>

            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xl font-bold text-amber-800">
                {product.currency} {product.discountPrice.toFixed(2)}
              </span>
              <span className="line-through text-gray-400">
                {product.currency} {product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-2">
              <strong>Stock:</strong> {product.stockCount > 0 ? `${product.stockCount} available` : "Out of stock"}
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
