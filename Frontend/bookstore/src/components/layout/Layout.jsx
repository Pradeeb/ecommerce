import React from 'react'
import Navebar from './Navebar'
import HomePage from '../Pages/HomePage'

const Layout = () => {
  return (
    <div className='min-h-screen'>
    <div><Navebar/></div>
    <div><HomePage/></div>
    <div>Address details</div>
    </div>
  )
}

export default Layout