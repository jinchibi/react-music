import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header'
import 'antd/dist/reset.css'
import AppPlayerBar from './views/player/app-player-bar'
import { useJcDispatch } from './store'
import { fetchCurrentSongAction } from './views/player/store'

function App() {
  const dispatch = useJcDispatch()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(5254815))
  }, [])
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
