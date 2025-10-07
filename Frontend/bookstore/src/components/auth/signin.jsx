import { FaLock } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from "react-hook-form"

import {gitSignUp as github,googleSignUp as google} from '../hooks/useURL';


import bgImage from '../../assets/authbg/signinbg.png';

//yup 
const schema = yup.object().shape({
    mobileNo: yup.string().required("Mobile number is required").matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
    password: yup.string().required("Password is required")
})

function signin() {

    //Use for password eye button
    const [showPassword, setShowPassword] = useState(false);

    // Form input react hook form 
    const { register, handleSubmit, formState :{errors} } = useForm({
        resolver:yupResolver(schema)
    });
     console.error(errors);
 
    let googleSignUp = () => {
        window.location.href =google
    }
    let githubSignUp = () => {
        window.location.href = github
    }

    return (
        <div className="bg-center bg-cover bg-no-repeat w-screen h-screen relative md:flex md:justify-center md:align-middle"
            style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='mt-36 h-10/12 md:h-3/4 md:mt-20  absolute bg-gray-50 md:w-1/2 w-screen rounded-4xl'>
                <div className='m-2 md:m-5'>
                    <p className='text-2xl font-bold mt-10 '>Log in</p>
                    <p className='font-normal mt-0.5 '>Welcome back, Please enter your details</p>
                    <form onSubmit={handleSubmit(data => console.log(data))}>
                        <div>
                            <div className="mt-3">
                                <label className="block mb-1 font-semibold" htmlFor="email">Mobile No</label>
                                 <p>{errors.mobileNo?.message}</p>
                                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                    <FaPhone className="text-gray-400 mr-2" />
                                    <input
                                        type="number"
                                        id="mobil"
                                        placeholder="Enter your mobil No"
                                        className="bg-transparent outline-none flex-1"
                                        {...register("mobileNo")}
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <label className="block mb-1 font-semibold" htmlFor="password">Password</label>
                                 <p className="text-red-500">{errors.password?.message}</p>
                                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                    <FaLock className="text-gray-400 mr-2" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Password"
                                        className="bg-transparent outline-none flex-1"
                                         {...register("password")}
                                    />
                                   
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="focus:outline-none"
                                    >
                                        {showPassword ? <BsEyeSlash className="text-gray-600" /> : <BsEye className="text-gray-600" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-4 mt-2">
                                <label className="flex items-center text-gray-700 text-sm">
                                    <label className="font-semibold">Don’t have an account? <Link className="text-blue-500 font-bold" to="/signup">Sign up</Link></label>
                                </label>
                                <a href="#" className="text-blue-600 text-sm hover:underline">Forgot password</a>
                            </div>
                            <div className="mt-7">
                                <input type='submit' value="Log in" className='text-ce w-full bg-blue-600 text-white rounded-lg border-2 border-blue-600 py-2 px-4' />
                            </div>
                        </div>
                    </form>
                    <div className="w-full max-w-md mx-auto">
                        {/* Divider with text */}
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500">Or log in with</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        {/* Social buttons */}
                        <div className="flex justify-center gap-4">
                            <button className="w-16 h-16  hover:bg-amber-50 cursor-pointer bg-white rounded-xl shadow flex items-center justify-center border hover:shadow-md transition
                             focus:outline-2 focus:outline-offset-2 focus:outline-blue-600">
                                <FaApple className="text-3xl text-black" />
                            </button>
                            <button onClick={googleSignUp}
                                className="w-16 h-16  hover:bg-amber-50 cursor-pointer bg-white rounded-xl shadow flex items-center justify-center border hover:shadow-md transition\
                             focus:outline-2 focus:outline-offset-2 focus:outline-blue-600">
                                <FcGoogle className="text-3xl" />
                            </button>
                            <button onClick={githubSignUp}
                                className="w-16 h-16 hover:bg-amber-50 cursor-pointer bg-white rounded-xl shadow flex items-center justify-center border hover:shadow-md transition
                                               focus:outline-2 focus:outline-offset-2 focus:outline-blue-600">
                                <FaFacebookF className="text-3xl text-[#1877f3]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default signin