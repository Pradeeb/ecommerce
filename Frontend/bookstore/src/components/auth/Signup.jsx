import React from 'react'

import { FaLock, FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import bgImage from '../../assets/authbg/signinbg.png';

const schema=yup.object().shape({
name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  mobileNo: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
})

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //useform 
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    });
    console.error(errors);
    
    let googleSignUp = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google"
    }
    let githubSignUp = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/github"
    }
    // style={{ backgroundImage: `url(${bgImage})` }}

    return (
        <div className="bg-center bg-cover bg-no-repeat w-screen h-screen relative md:flex md:justify-center md:align-middle  bg-gray-100"
        >
            <div className='md:h-auto md:mt-20  absolute md:w-2/5 bg-white w-screen rounded-4xl'>
                <div className='m-2 md:m-5'>
                    <p className='text-2xl font-bold mt-10 '>Sign UP</p>
                    <p className='font-normal mt-0.5 '>Welcome Please enter your details</p>
                    <form onSubmit={handleSubmit(data=>console.log(data))}>
                    <div>
                        <div className="mt-3">
                             <label className="block mb-1 font-semibold">Name</label>
                             <p className="text-red-500">{errors.name?.message}</p>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                <FaUser className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="bg-transparent outline-none flex-1"
                                {...register("name")}
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="block mb-1 font-semibold" htmlFor="email">Mobile No</label>
                            <p className="text-red-500">{errors.mobileNo?.message}</p>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                <FaPhone className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    id="mobil"
                                    placeholder="Enter your mobil No"
                                    className="bg-transparent outline-none flex-1"
                                 {...register("mobileNo")}
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
                            <p className="text-red-500">{errors.email?.message}</p>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                <IoIosMail className="text-gray-400 mr-2 font text-lg" />
                                <input
                                    type="email"
                                    id="mobil"
                                    placeholder="Enter your email"
                                    className="bg-transparent outline-none flex-1"
                                 {...register("email")}
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
                        <div className="mt-2">
                            <label className="block mb-1 font-semibold" htmlFor="password">Confirm Password</label>
                            <p className="text-red-500">{errors.confirmPassword?.message}</p>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                <FaLock className="text-gray-400 mr-2" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="confirm Password"
                                    className="bg-transparent outline-none flex-1"
                                 {...register("confirmPassword")}
                               />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="focus:outline-none"
                                >
                                    {showConfirmPassword ? <BsEyeSlash className="text-gray-600" /> : <BsEye className="text-gray-600" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 mt-2">
                            <label className="flex items-center text-gray-700 text-sm">
                                <label className="font-semibold">Already have an account? <Link className="text-blue-500 font-bold" to="/#">Log in</Link></label>

                            </label>
                            {/* <a href="#" className="text-blue-600 text-sm hover:underline">Forgot password</a> */}
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

export default Signup