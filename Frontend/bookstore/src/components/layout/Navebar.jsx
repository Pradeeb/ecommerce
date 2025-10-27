import SucceesPage from '../Pages/SucceesPage';
import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { getAllCategory } from '../hooks/useURL';
import axios from "axios"

const Navebar = () => {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get(getAllCategory, { withCredentials: true })
            .then(response => {
                setCategory(response.data.payLoad); // save product in state
                console.log(category);
                
            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
    }, [])

    return (
        <>
            <div className='bg-white w-full h-32 sticky top-0'>
                <div className='bg-linear-to-t from-white-50 to-fuchsia-300 w-full h-20 sticky  top-0 px-10 pt-5'>
                    <div className='flex flex-row justify-around'>
                        <div><Link className='text-3xl font-bold text-fuchsia-800 '>Book Store</Link></div>
                        <div className='flex bg-white rounded-xl p-0.5 basis-1/2 h-10'><IoSearchSharp className='text-2xl m-1' />
                            <input type="text" className='w-full  focus:outline-none text-xl' />
                        </div>
                        <div className='flex flex-row justify-around'>
                            <Link to="/">
                                <TiShoppingCart className='mr-10 text-3xl' />
                                <p>Singin</p>
                            </Link>
                            <Link>
                                <FaRegUserCircle className='text-3xl' />
                                <p>Cart</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-center'>
                    {category.map((data, index) => (
                        <Link to="#" key={index} className="me-4">
                            <p
                                tabIndex={0}
                                className="border-b-2 p-1 border-transparent focus:border-b-fuchsia-600 focus:text-fuchsia-600 text-xl  focus:font-semibold"
                            >
                                {data}
                            </p>
                        </Link>
                    ))}
                </div>

            </div>
            <allProduct />
            <SucceesPage />
        </>
    )
}

export default Navebar