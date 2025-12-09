import './App.css'
import Singin from "./components/auth/Signin"
import Singup from "./components/auth/Signup"
import { Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Singin />} />
      <Route path='/signup' element={<Singup />} />
      <Route path='/main' element={<Layout type="main"/>}/>
      <Route path='/viewproduct' element={<Layout type="viewmono"/>}/>
    </Routes>
  )
}

export default App
