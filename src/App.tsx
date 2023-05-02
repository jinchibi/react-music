import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header'
import 'antd/dist/reset.css'
import AppPlayerBar from './views/player/app-player-bar'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="loading...">
        <div>{useRoutes(routes)} </div>
      </Suspense>

      {/* 播放器组件 */}
      <AppPlayerBar />
    </div>
  )
}

export default App
