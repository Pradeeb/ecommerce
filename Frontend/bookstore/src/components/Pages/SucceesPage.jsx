import React, { useEffect, useState } from 'react'
import axios from "axios"
import { getUser } from '../hooks/useURL';
const SucceesPage = () => {

  const [user,setUser]=useState(null);

  useEffect(() => {
    axios.get(getUser, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        setUser(response.data); // save user in state
      })
      .catch(error => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-700">Login Successful 🎉</h1>
    </div>
  )
}

export default SucceesPage