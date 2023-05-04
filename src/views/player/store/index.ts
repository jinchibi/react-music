import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'
import { ILyric, parseLyric } from '@/utils/parse_lyrics'

interface IPlayerType {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
}

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    // 获取歌曲信息
    getSongDetail(id).then((res) => {
      // console.log(res)
      if (!res.songs.length) return
      const song = res.songs[0]
      // console.log(song)
      dispatch(changeCurrentSongAction(song))
    })
    // 获取歌词信息
    getSongLyric(id).then((res) => {
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
  lyricIndex: -1
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
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricAction,
  changeLyricIndexAction
} = playerSlice.actions
export default playerSlice.reducer
