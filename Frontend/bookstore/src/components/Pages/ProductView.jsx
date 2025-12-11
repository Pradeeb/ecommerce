import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSingleProduct } from "../hooks/useURL";

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // API call
  const fetchProduct = async () => {
    const res = await axios.get(`${getSingleProduct}/${id}`, {
      withCredentials: true,
    });
    return res.data; // APIResponse
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["single-product", id],
    queryFn: fetchProduct,
    retry: false,
    staleTime: 0,
  });

  // update state after data arrives
  useEffect(() => {
    if (data?.payLoad) {
      setProduct(data.payLoad);
    }
  }, [data]);

  // Loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading product...
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-xl">
        Failed to load product.
      </div>
    );
  }

  // Prevent render crash
  if (!product) return null;

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-start gap-6 bg-white rounded-2xl shadow-lg p-6">

        {/* ------------------ IMAGE SECTION ------------------ */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            className="w-72 h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
            src={product.coverImage}
            alt={product.title}
          />
        </div>

        {/* ------------------ DETAILS SECTION ------------------ */}
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">
              {product.title}
            </h2>

            <p className="text-sm text-gray-600 mb-4">{product.category}</p>

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xl font-bold text-amber-800">
                {product.currency} {product.discountPrice.toFixed(2)}
              </span>
              <span className="line-through text-gray-400">
                {product.currency} {product.price.toFixed(2)}
              </span>
            </div>

            {/* Stock */}
            <p className="text-sm text-gray-700 mb-4">
              <strong>Stock:</strong>{" "}
              {product.stockCount > 0
                ? `${product.stockCount} available`
                : "Out of stock"}
            </p>

            {/* Book Details */}
            {product.bookDetails && (
              <div className="mb-4 bg-amber-100 p-3 rounded-lg">
                <p><strong>ISBN10:</strong> {product.bookDetails.isbn10}</p>
                <p><strong>ISBN13:</strong> {product.bookDetails.isbn13}</p>
                <p><strong>Author:</strong> {product.bookDetails.author}</p>
              </div>
            )}

            {/* Meta Info */}
            {product.productMeta && (
              <div className="mb-4 bg-gray-100 p-3 rounded-lg">
                <p><strong>Rating:</strong> ⭐ {product.productMeta.rating}</p>
                <p><strong>Reviews:</strong> {product.productMeta.reviewsCount}</p>
              </div>
            )}
          </div>

          {/* Buy Button */}
          <div className="mt-6">
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium  py-2 px-6 rounded-lg transition-colors duration-300 text-center"
            >
              Buy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
