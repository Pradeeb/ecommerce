import React from 'react'
import Navebar from './Navebar'
import HomePage from '../Pages/HomePage'
import ProductView from '../Pages/ProductView'
import withAuth from '../auth/withAuth';

const Layout = ({type}) => {
  return (
    <div className='min-h-screen'>
    <div><Navebar/></div>
    {type=="main"?<div><HomePage/></div>:<></>}
    {type=="viewmono"?<div><ProductView/></div>:<div>Loading</div> }
    <div>Address details</div>
    </div>
  )
}

export default withAuth(Layout);  