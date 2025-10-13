import './App.css'
import Singin from "./components/auth/Signin"
import Singup from "./components/auth/Signup"
import { Routes, Route } from "react-router-dom";
import SucceesPage from './components/Pages/SucceesPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Singin />} />
      <Route path='/signup' element={<Singup />} />
      <Route path='/main' element={<SucceesPage />} />
    </Routes>
  )
}

export default App
