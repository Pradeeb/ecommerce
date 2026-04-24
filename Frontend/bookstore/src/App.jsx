import './App.css'
import Singin from "./components/auth/Signin"
import Singup from "./components/auth/Signup"
import { Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Suspense } from 'react';

function App() {

  return (
    <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading...</div>}>
      <Routes>
        <Route path='/' element={<Singin />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/main' element={<Layout type="main"/>}/>
        <Route path='/viewproduct/:id' element={<Layout type="viewmono"/>}/>
      </Routes>
    </Suspense>
  )
}

export default App
