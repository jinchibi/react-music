import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import { useJcSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { Carousel } from 'antd'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  const { banners } = useJcSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )
  const [imgIndex, setImgIndex] = useState(0)
  function handleAfterChange(current: number) {
    setImgIndex(current)
  }
  function handleBeforeChange() {
    if (imgIndex !== 0) setImgIndex(-1)
  }
  // 左右两边模糊效果
  // 获取到当前图片的索引，在style上动态添加背景
  let currentIndexImgUrl
  if (imgIndex >= 0 && banners && banners.length > 0) {
    currentIndexImgUrl = banners[imgIndex]?.imageUrl + '?imageView&blur=40x20'
  }
  return (
    <BannerWrapper
      style={{
        background: `url('${currentIndexImgUrl}') center center / 6000px`
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            ref={bannerRef}
            effect="fade"
            afterChange={handleAfterChange}
            beforeChange={handleBeforeChange}
            dots={false}
          >
            {banners &&
              banners.map((item) => (
                <div key={item.imageUrl} className="banner-item">
                  <img className="image" src={item.imageUrl} alt="" />
                </div>
              ))}
          </Carousel>
          <ul className="dots">
            {banners &&
              banners.map((item, index) => {
                return (
                  <li key={item.imageUrl}>
                    <span
                      className={classNames('item', {
                        active: index === imgIndex
                      })}
                    ></span>
                  </li>
                )
              })}
          </ul>
        </BannerLeft>
        <BannerRight>right</BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={() => bannerRef.current?.prev()}
          ></button>
          <button
            className="btn right"
            onClick={() => bannerRef.current?.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}
export default memo(TopBanner)
