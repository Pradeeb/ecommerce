import React, { lazy, Suspense } from 'react'
import Navebar from './Navebar'
import withAuth from '../auth/withAuth';

const HomePage = lazy(() => import('../Pages/HomePage'));
const ProductView = lazy(() => import('../Pages/ProductView'));

const Layout = ({type}) => {
  return (
    <div className='min-h-screen'>
    <div><Navebar/></div>
    <Suspense fallback={<div className="flex justify-center items-center py-8">Loading page...</div>}>
      {type=="main"?<div><HomePage/></div>:<></>}
      {type=="viewmono"?<div><ProductView/></div>:<div>Loading</div> }
    </Suspense>
    <div>Address details</div>
    </div>
  )
}

export default withAuth(Layout);  