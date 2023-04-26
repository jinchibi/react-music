import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderV2Wrapper } from './style'

interface IProps {
  children?: ReactNode
  title: string
  more?: string
  morePath?: string
}

const SectionHeaderV2: FC<IProps> = (props) => {
  const { title, more = '查看全部', morePath } = props

  return (
    <HeaderV2Wrapper>
      <h3 className="title">{title}</h3>
      <a href={morePath}>{more} &gt;</a>
    </HeaderV2Wrapper>
  )
}

export default memo(SectionHeaderV2)
