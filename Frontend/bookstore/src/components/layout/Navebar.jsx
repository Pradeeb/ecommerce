import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegUserCircle } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { getAllCategory, logout } from '../hooks/useURL';
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Navebar = () => {

    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    const logoutlogic = async () => {
        try {
            await axios.post(
                logout,        // backend logout URL
                {},
                { withCredentials: true }
            );
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            navigate("/", { replace: true });
        }
    };


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
            <div className="bg-white w-full sticky top-0 z-50">
                <div className="bg-linear-to-t from-white-50 to-fuchsia-300 w-full px-4 py-3">

                    {/* TOP ROW */}
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link className="text-2xl md:text-3xl font-bold text-fuchsia-800">
                            Book Store
                        </Link>
                                          {/* SEARCH BAR */}
                    <div className="mt-3 md:mt-0 md:flex md:justify-center">
                        <div className="flex bg-white rounded-xl p-1 w-full md:w-1/2 h-10 items-center">
                            <IoSearchSharp className="text-2xl mx-2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search books..."
                                className="w-full focus:outline-none text-base md:text-xl"
                            />
                        </div>
                    </div>

                        {/* Icons */}
                        <div className="flex items-center gap-6">
                            <Link to="/" className="flex flex-col items-center">
                                <TiShoppingCart className="text-2xl md:text-3xl" />
                                <p className="hidden md:block text-sm">Cart</p>
                            </Link>

                            <Link className="flex flex-col items-center">
                                <FaRegUserCircle className="text-2xl md:text-3xl" />
                                <p className="hidden md:block text-sm">Signin</p>
                            </Link>

                            <button
                                className="flex flex-col items-center hover:text-red-500"
                                onClick={logoutlogic}
                            >
                                <FaPowerOff className="text-xl md:text-2xl" />
                                <p className="hidden md:block text-sm">Logout</p>
                            </button>
                        </div>
                    </div>

  

                </div>


                <div className="flex justify-center">
                    <div className="flex flex-nowrap gap-4 overflow-x-auto whitespace-nowrap px-4 scrollbar-hide">
                        {category.map((data, index) => (
                            <Link to="#" key={index}>
                                <p
                                    tabIndex={0}
                                    className="border-b-2 p-1 border-transparent focus:border-b-fuchsia-600 focus:text-fuchsia-600 text-xl hover:text-fuchsia-600"
                                >
                                    {data}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>


            </div>
        </>
    )
}

export default Navebar