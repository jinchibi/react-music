/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { memo, useRef, useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { BarWrapper, BarControl, BarPlayInfo, BarOperator } from './style'
import { NavLink } from 'react-router-dom'
import { Slider, message } from 'antd'
import { useJcDispatch, useJcSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { getSongPlayUrl } from '@/utils/handle-player'
import { changeLyricIndexAction } from '../store'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  const { currentSong, lyrics, lyricIndex } = useJcSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex
    }),
    shallowEqual
  )
  const dispatch = useJcDispatch()
  const audioRef = useRef<HTMLAudioElement>(null)

  // 是否播放
  const [isPlaying, setIsPlaying] = useState(false)
  // 进度 0 - 100
  const [progress, setProgress] = useState(0)
  // 歌曲总时间 ms
  const [duration, setDuration] = useState(0)
  // 歌曲现在播放时间 s
  const [currentTime, setCurrentTime] = useState(0)
  // 是否正在拖拽
  const [isSlide, setIsSlider] = useState(false)

  useEffect(() => {
    // 根据id匹配到歌曲
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    // 成功或者失败的回调
    audioRef.current
      ?.play()
      .then(() => {
        // console.log('success')
      })
      .catch((err: any) => {
        setIsPlaying(false)
        console.log('failure', err)
      })
    setDuration(currentSong.dt)
  }, [currentSong])

  // 组件内部的事件处理
  // 设置播放与暂停
  function handlePlayBtnClick() {
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    setIsPlaying(!isPlaying)
  }

  // 随时间变换进度
  function handleTimeUpdate() {
    // 获取当前播放时间
    const currentTime = audioRef.current!.currentTime
    if (!isSlide) {
      // 计算当前歌曲进度
      setProgress(((currentTime * 1000) / duration) * 100)
      setCurrentTime(currentTime)
    }
    // 根据时间匹配对应的歌词
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime * 1000) {
        index = i - 1
        break
      }
    }
    // 匹配上对应歌词的index
    if (index === lyricIndex || index === -1) return
    dispatch(changeLyricIndexAction(index))
    message.open({
      content: lyrics[index].text
    })
  }

  // 格式化时间
  function formatTime(ms: number) {
    const ints = Math.floor(ms / 1000)
    const time = `0${Math.floor(ints / 60)}:${
      ints % 60 >= 10 ? Math.floor(ints % 60) : '0' + Math.floor(ints % 60)
    }`
    return time
  }

  // 点击Slider后改变进度
  function handleSliderAfterChange(value: number) {
    const currentTime = ((value / 100) * duration) / 1000
    audioRef.current!.currentTime = currentTime
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSlider(false)
  }

  // 滑动Slider后改变进度
  function handleSliderChanging(value: number) {
    // console.log(value)
    setProgress(value)
    setIsSlider(true)
    const currentTime = ((value / 100) * duration) / 1000
    setCurrentTime(currentTime)
  }

  return (
    <BarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl>
          <button className="btn sprite_playbar prev"></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
            style={{ backgroundPosition: `0 -${isPlaying ? 165 : 204}px` }}
          ></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayInfo>
          <NavLink to="/discover/player">
            <img src={currentSong.al?.picUrl + '?param=48x48'} alt="" />
          </NavLink>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong.ar?.[0].name}</span>
            </div>
            <div className="progress">
              <Slider
                tooltip={{ formatter: null }}
                value={progress}
                onAfterChange={handleSliderAfterChange}
                onChange={handleSliderChanging}
              />
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
