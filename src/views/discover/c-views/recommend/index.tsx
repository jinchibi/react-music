import { useJcDispatch } from '@/store'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import {
  fetchArtistListAction,
  fetchBannersDataAction,
  fetchHotRecommendAction,
  fetchNewAlbumAction,
  fetchPlayListAction
} from './store/recommend'
import TopBanner from './c-cpns/top-banner'
import { RecommendWrapper } from './style'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import TopRanking from './c-cpns/top-ranking'
import UserLogin from './c-cpns/user-login'
import HotAnchor from './c-cpns/hot-anchor'
import SettleSinger from './c-cpns/settle-singer'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useJcDispatch()
  // 使用dispatch请求异步数据
  // 发起action
  useEffect(() => {
    dispatch(fetchBannersDataAction())
    dispatch(fetchHotRecommendAction())
    dispatch(fetchNewAlbumAction())
    dispatch(fetchPlayListAction())
    dispatch(fetchArtistListAction())
  }, [])
  return (
    <RecommendWrapper>
      <TopBanner />
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend />
          <NewAlbum />
          <TopRanking />
        </div>
        <div className="right">
          <UserLogin />
          <SettleSinger />
          <HotAnchor />
        </div>
      </div>
    </RecommendWrapper>
  )
}
export default memo(Recommend)
