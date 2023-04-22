import { useJcDispatch } from '@/store'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { fetchBannersDataAction } from './store/recommend'
import TopBanner from './c-cpns/top-banner'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useJcDispatch()
  // 使用dispatch请求异步数据
  // 发起action
  useEffect(() => {
    dispatch(fetchBannersDataAction())
  }, [])
  return (
    <div>
      <TopBanner />
    </div>
  )
}
export default memo(Recommend)
