import React, { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'

function Discover() {
  return (
    <div>
      <div>
        <Link to={'/discover/recommend'}>推荐</Link>
        <Link to={'/discover/ranking'}>排行榜</Link>
        <Link to={'/discover/songs'}>歌单</Link>
        <Link to={'/discover/djradio'}>主播电台</Link>
        <Link to={'/discover/artist'}>歌手</Link>
        <Link to={'/discover/album'}>新碟上架</Link>
      </div>
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Discover
