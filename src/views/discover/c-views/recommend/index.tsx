import hyRequest from '@/service'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  useEffect(() => {
    hyRequest
      .get({
        url: '/banner'
      })
      .then((res) => {
        console.log(res)
      })
  }, [])
  return <div>Recommend</div>
}
export default memo(Recommend)
