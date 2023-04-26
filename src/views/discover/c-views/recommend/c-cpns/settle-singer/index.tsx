import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useJcSelector } from '@/store'
import { SettleWrapper } from './style'
import SectionHeaderV2 from '@/components/section-header-v2'
// import { getImageSize } from '@/utils/handle-img-url'

interface IProps {
  children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {
  const { settleSingers } = useJcSelector((state) => ({
    settleSingers: state.recommend.settleSingers
  }))

  return (
    <SettleWrapper>
      <SectionHeaderV2 title="入驻歌手" morePath="/discover/artist" />
      <div className="singer-list">
        {settleSingers &&
          settleSingers.map((item: any) => {
            return (
              <a href="/singer" key={item.id} className="item">
                <img src={item.picUrl + '?param=62x62'} alt="" />
                <div className="info">
                  <div className="singer">{item.name}</div>
                  <div className="desc">{item.alias.join('') || item.name}</div>
                </div>
              </a>
            )
          })}
      </div>
      <div className="apply-for">
        <a href="">申请成为网易音乐人</a>
      </div>
    </SettleWrapper>
  )
}

export default memo(SettleSinger)
