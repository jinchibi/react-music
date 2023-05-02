/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { memo, useRef, useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { BarWrapper, BarControl, BarPlayInfo, BarOperator } from './style'
import { NavLink } from 'react-router-dom'
import { Slider } from 'antd'
import { useJcSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { getSongPlayUrl } from '@/utils/handle-player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  const { currentSong } = useJcSelector(
    (state) => ({
      currentSong: state.player.currentSong
    }),
    shallowEqual
  )
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    audioRef.current
      ?.play()
      .then(() => {
        console.log('success')
      })
      .catch((err: any) => {
        setIsPlaying(false)
        console.log('failure', err)
      })
    setDuration(currentSong.dt)
  }, [currentSong])

  // 组件内部的事件处理
  function handlePlayBtnClick() {
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    setIsPlaying(!isPlaying)
  }

  function handleTimeUpdate() {
    const currentTime = audioRef.current!.currentTime

    setProgress(((currentTime * 1000) / duration) * 100)
    setCurrentTime(currentTime)
  }

  function formatTime(ms: number) {
    const ints = Math.floor(ms / 1000)
    const time = `0${Math.floor(ints / 60)}:${
      ints % 60 > 10 ? Math.floor(ints % 60) : '0' + Math.floor(ints % 60)
    }`
    return time
  }

  return (
    <BarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl>
          <button className="btn sprite_playbar prev"></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayInfo>
          <NavLink to="/discover/player">
            <img src={currentSong.al.picUrl + '?param=48x48'} alt="" />
          </NavLink>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong.ar[0].name}</span>
            </div>
            <div className="progress">
              <Slider tooltip={{ formatter: null }} value={progress} />
              <div className="time">
                <span className="current">
                  {formatTime(currentTime * 1000)}
                </span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayInfo>
        <BarOperator>
          <div className="left">
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop"></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </BarWrapper>
  )
}
export default memo(AppPlayerBar)
