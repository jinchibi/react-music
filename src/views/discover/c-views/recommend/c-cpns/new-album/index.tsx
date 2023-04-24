import React, { memo, useRef } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { AlbumWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { Carousel } from 'antd'
import { useJcSelector } from '@/store'
import NewAlbumItem from '@/components/new-album-item'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  // 获取轮播图内部函数可以控制轮播图向上或者向下滑动
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  // 从Redux中获取数据
  const { newAlbums } = useJcSelector((state) => ({
    newAlbums: state.recommend.newAlbums
  }))
  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="arrow arrow-left sprite_02"
          onClick={() => bannerRef.current?.prev()}
        ></button>
        <div className="banner">
          <Carousel autoplay ref={bannerRef} dots={false}>
            {[0, 1].map((item) => (
              <div key={item}>
                <div className="album">
                  {newAlbums &&
                    newAlbums.slice(item * 5, (item + 1) * 5).map((album) => {
                      return <NewAlbumItem key={album.id} itemData={album} />
                    })}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={() => bannerRef.current?.next()}
        ></button>
      </div>
    </AlbumWrapper>
  )
}
export default memo(NewAlbum)
