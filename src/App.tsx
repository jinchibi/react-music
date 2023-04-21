import React, { Suspense } from 'react'
import { Link, useRoutes } from 'react-router-dom'
import routes from './router'
import { shallowEqual } from 'react-redux'

import { useJcSelector, useJcDispatch } from './store'
import { changeCountAction } from './store/modules/counter'

function App() {
  const dispatch = useJcDispatch()
  const { count } = useJcSelector(
    (state) => ({
      count: state.counter.count
    }),
    shallowEqual
  )

  return (
    <div className="App">
      <Link to={'/download'}>下载客户端</Link>
      <Link to={'/focus'}>关注</Link>
      <Link to={'/discover'}>发现音乐</Link>
      <Link to={'/mine'}>我的音乐</Link>
      <div>{count}</div>
      <button onClick={() => dispatch(changeCountAction(count + 1))}>
        点击
      </button>
      <Suspense fallback="loading...">
        <div>{useRoutes(routes)} </div>
      </Suspense>
    </div>
  )
}

export default App
