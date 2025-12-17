import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSingleProduct, getCategoryProduct } from "../hooks/useURL";
import { useNavigate } from 'react-router-dom';

const ProductView = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const viewProduct = (data) => {
    navigate(`/viewproduct/${data.id}`);
  }

  // API call for single product
  const fetchProduct = async () => {
    const res = await axios.get(`${getSingleProduct}/${id}`, {
      withCredentials: true,
    });
    return res.data.payLoad; // APIResponse
  };
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["single-product", id],
    queryFn: fetchProduct,
    retry: false,
    staleTime: 0,
  });


  // API call for category related product
  const fetchCategoryProduct = async () => {
    const res = await axios.get(`${getCategoryProduct}/${product.category}`, {
      withCredentials: true,
    });
    return res.data; // APIResponse
  }
  const {
    data: categoryResponse, isLoading: categoryLoading } = useQuery({
      queryKey: ["category-product", product?.category],
      queryFn: fetchCategoryProduct,
      enabled: !!product?.category,   // 🔑 runs ONLY after product loads
      retry: false,
    });


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
     
       {/* ------------------ Same category products are load here SECTION ------------------ */}
      <div className="container mx-auto mt-16 grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 ">
        {categoryLoading ? (
          <p>Loading related products...</p>
        ) : (
          categoryResponse?.payLoad
            ?.filter((data) => data.id !== product?.id)   // ✅ remove same product
            .map((data) => (
              <div
                key={data.id}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col
               bg-white"
              >
                <img
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  src={data.coverImage}
                  alt={data.title}
                />
                <div className="px-6 py-4 flex-1 flex flex-col">
                  <div className="font-bold text-xl mb-2">{data.title}</div>
                  <p className="text-gray-700 text-base flex-1">{data.description || ""}</p>
                </div>
                <div className="px-6 pt-1 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bookDetails.isbn13}</span>
                  {data.bookDetails.language && (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bookDetails.language}</span>
                  )}
                  <span className="inline-block bg-gray-200 rounded-full px-3 p1y- text-sm font-semibold text-gray-700 mr-2 mb-2">{data.price}</span>
                  <button className='inline-block bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-2 px-6 rounded-lg transition-colors duration-300'
                    onClick={() => viewProduct(data)}>View Product</button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ProductView;
