import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'
import { ILyric, parseLyric } from '@/utils/parse_lyrics'
import type { IRootState } from '@/store'

interface IPlayerType {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}

interface IThunkState {
  state: IRootState
}

export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  IThunkState
>('currentSong', (id, { dispatch, getState }) => {
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    // 没找到
    // 获取歌曲信息
    getSongDetail(id).then((res) => {
      if (!res.songs.length) return
      const song = res.songs[0]
      dispatch(changeCurrentSongAction(song))
      // 将新歌添加到播放列表中
      const newSongList = [...playSongList]
      newSongList.push(song)
      dispatch(changeplaySongListAction(newSongList))
      dispatch(changeplaySongIndexAction(newSongList.length - 1))
    })
  } else {
    // 找到了
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changeplaySongIndexAction(findIndex))
  }

  // 获取歌词信息
  getSongLyric(id).then((res) => {
    // console.log(res)
    // 获取歌词
    const lyricString = res.lrc.lyric
    // 解析后的歌词
    const lyrics = parseLyric(lyricString)
    dispatch(changeLyricAction(lyrics))
  })
})

export const changeMusicAction = createAsyncThunk<void, string, IThunkState>(
  'changemusic',
  (type, { dispatch, getState }) => {
    console.log(1)
    const player = getState().player
    const playerMode = player.playMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList

    let newIndex = songIndex
    if (playerMode === 1) {
      // 随机播放
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      newIndex = type === 'left' ? songIndex - 1 : songIndex + 1
      if (newIndex < 0) newIndex = songList.length - 1
      if (newIndex >= songList.length) newIndex = 0
    }
    // 获取当前的歌曲
    const song = songList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changeplaySongIndexAction(newIndex))

    // 请求新的歌词
    getSongLyric(song.id).then((res) => {
      // console.log(res)
      // 获取歌词
      const lyricString = res.lrc.lyric
      // 解析后的歌词
      const lyrics = parseLyric(lyricString)
      dispatch(changeLyricAction(lyrics))
    })
  }
)

const initialState: IPlayerType = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: [],
  playSongIndex: -1,
  playMode: 0 // 0 顺序 1 随机 2 循环
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction: (state, { payload }) => {
      state.currentSong = payload
    },
    changeLyricAction: (state, { payload }) => {
      state.lyrics = payload
    },
    changeLyricIndexAction: (state, { payload }) => {
      state.lyricIndex = payload
    },
    changeplaySongListAction: (state, { payload }) => {
      state.playSongList = payload
    },
    changeplaySongIndexAction: (state, { payload }) => {
      state.playSongIndex = payload
    },
    changePlayModeAction: (state, { payload }) => {
      state.playMode = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricAction,
  changeLyricIndexAction,
  changeplaySongIndexAction,
  changeplaySongListAction,
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer
