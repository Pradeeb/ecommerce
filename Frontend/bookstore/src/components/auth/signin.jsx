import { FaLock } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast';

import { gitSignUp as github, googleSignUp as google, signin } from '../hooks/useURL';


import axios from "axios";

//yup 
const schema = yup.object().shape({
    mobileNo: yup.string().required("Mobile number is required").matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
    password: yup.string().required("Password is required")
})

function Signin() {

    //Use for password eye button
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    // Form input react hook form 
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const signinlogic = async (data) => {

        const formdata = new FormData();
        formdata.append("mobileNumber", data.mobileNo);
        formdata.append("password", data.password);

        const res = await axios.post(signin, formdata, {
            withCredentials: true,
        });


        return res.data;

    }

    const mutation = useMutation({
        mutationFn: signinlogic,
        onSuccess: (data) => {
            if (data.code == "OK") {
                navigate('/main')
                //            alert(data.message); 
                console.log("Name:", data.payLoad.name);
                console.log("Mobile Number:", data.payLoad.mobileNumber);

            }
        },
        onError: (error) => {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
                reset();
            }
        }

    });

    //     console.error(errors || null);

    let googleSignUp = () => {
        window.location.href = google
    }
    let githubSignUp = () => {
        window.location.href = github
    }

    const signinfn = (data) => {
        mutation.mutate(data)
    }

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4 py-8">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-10 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-0 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400">
                            Welcome Back
                        </h1>
                        <p className="text-gray-300 text-sm">Enter your credentials to access your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(signinfn)} className="space-y-5">
                        <div>
                            <div className="mt-3">
                                <label className="block mb-1 font-semibold" htmlFor="email">Mobile No</label>
                                <p>{errors.mobileNo?.message}</p>
                                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                    <FaPhone className="text-gray-400 mr-2" />
                                    <input
                                        type="number"
                                        id="mobile"
                                        placeholder="Enter your mobile No"
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
                                        className="focus:outline-none cursor-pointer"
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
                                <input type='submit' value="Log in" className='text-ce w-full bg-blue-600 hover:bg-blue-800 cursor-pointer text-white rounded-lg border-2 border-blue-600 py-2 px-4' />
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-500/50"></div>
                        <span className="px-3 text-gray-400 text-xs">OR</span>
                        <div className="flex-grow border-t border-gray-500/50"></div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="flex justify-center gap-4">
                        <button 
                            type="button"
                            className="w-14 h-14 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white flex items-center justify-center transition transform hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50 border border-cyan-500/30"
                        >
                            <FaApple className="text-2xl" />
                        </button>
                        <button 
                            type="button"
                            onClick={googleSignUp}
                            className="w-14 h-14 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white flex items-center justify-center transition transform hover:scale-110 hover:shadow-lg hover:shadow-fuchsia-500/50 border border-fuchsia-500/30"
                        >
                            <FcGoogle className="text-2xl" />
                        </button>
                        <button 
                            type="button"
                            onClick={githubSignUp}
                            className="w-14 h-14 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white flex items-center justify-center transition transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 border border-purple-500/30"
                        >
                            <FaFacebookF className="text-2xl text-blue-400" />
                        </button>
                    </div>

                    {/* Signup Link */}
                    <p className="text-center text-gray-300 text-sm mt-6">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-cyan-400 font-bold hover:text-cyan-300 transition">
                            Create one
                        </Link>
                    </p>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 blur-xl opacity-0 hover:opacity-100 transition duration-300 pointer-events-none"></div>
            </div>

            <Toaster />
        </div>
    )
}

export default Signin