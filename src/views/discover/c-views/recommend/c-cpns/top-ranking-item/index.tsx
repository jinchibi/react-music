import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingItemWrapper } from './style'

interface IProps {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  const { tracks = [] } = itemData
  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={itemData.coverImgUrl + '?param=80x80'} alt="" />
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks &&
          tracks.slice(0, 10).map((item: any, index: number) => {
            return (
              <div className="list-item" key={index}>
                <div className="rank">{index + 1}</div>
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="operate">
                    <button className="btn sprite_02 play"></button>
                    <button className="btn sprite_icon2 add"></button>
                    <button className="btn sprite_02 favor"></button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      <div className="footer">查看全部 &gt;</div>
    </RankingItemWrapper>
  )
}
export default memo(TopRankingItem)
