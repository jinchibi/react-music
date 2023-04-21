import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header'
import 'antd/dist/reset.css'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="loading...">
        <div>{useRoutes(routes)} </div>
      </Suspense>
    </div>
  )
}

export default App
