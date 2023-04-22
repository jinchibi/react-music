import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './c-cpns/nav-bar'

function Discover() {
  return (
    <div>
      <NavBar />
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Discover
