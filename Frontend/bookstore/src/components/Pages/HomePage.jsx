import { useEffect, useState } from 'react'
import axios from "axios"
import { getAllProduct } from '../hooks/useURL';
const HomePage = () => {

  const [pruduct, setPruduct] = useState([]);

  useEffect(() => {
    axios.get(getAllProduct, { withCredentials: true })
      .then(response => {
        setPruduct(response.data.payLoad); // save product in state
      })
      .catch(error => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
        {pruduct && pruduct.map((data) => (
          <div
            key={data.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <img
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              src={data.coverImage}
              alt={data.title}
            />
            <div className="px-6 py-4 flex-1 flex flex-col">
              <div className="font-bold text-xl mb-2">{data.title}</div>
              <p className="text-gray-700 text-base flex-1">{data.description || "No description"}</p>
            </div>
            <div className="px-6 pt-1 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bookDetails.isbn13}</span>
              {data.bookDetails.language && (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bookDetails.language}</span>
              )}
              <span className="inline-block bg-gray-200 rounded-full px-3 p1y- text-sm font-semibold text-gray-700 mr-2 mb-2">{data.price}</span>
              <button className='inline-block bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-2 px-6 rounded-lg transition-colors duration-300'>View Product</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage