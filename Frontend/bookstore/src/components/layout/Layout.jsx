import React from 'react'
import Navebar from './Navebar'
import HomePage from '../Pages/HomePage'
import ProductView from '../Pages/ProductView'
import withAuth from '../auth/withAuth';

const Layout = () => {
  return (
    <div className='min-h-screen'>
    <div><Navebar/></div>
    <div><HomePage/></div> 
    <div><ProductView/></div>
    <div>Address details</div>
    </div>
  )
}

export default withAuth(Layout);  