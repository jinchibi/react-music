import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { TopRankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useJcSelector } from '@/store'
import TopRankingItem from '../top-ranking-item'

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const { rankings } = useJcSelector((state) => ({
    rankings: state.recommend.rankings
  }))
  return (
    <TopRankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking" />
      <div className="content">
        {rankings.map((item) => (
          <TopRankingItem key={item.id} itemData={item} />
        ))}
      </div>
    </TopRankingWrapper>
  )
}
export default memo(TopRanking)
