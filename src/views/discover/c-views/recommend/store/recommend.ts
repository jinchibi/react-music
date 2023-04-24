import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getBanners, getPlayListDetail } from '../service/recommend'
import { getHotRecommend, getNewAlbum } from '@/service/modules/recommend'

// redux中请求异步数据，定义action
export const fetchBannersDataAction = createAsyncThunk(
  'banners',
  async (args, { dispatch }) => {
    // 将数据派发到banners上
    const res = await getBanners()
    dispatch(changeBannersAction(res.banners))
  }
)

export const fetchHotRecommendAction = createAsyncThunk(
  'hot-recommend',
  async (args, { dispatch }) => {
    const res = await getHotRecommend(8)
    // console.log(res)
    dispatch(changeHotRecommendAction(res.result))
  }
)

export const fetchNewAlbumAction = createAsyncThunk(
  'new-album',
  async (arg, { dispatch }) => {
    const res = await getNewAlbum()
    // console.log(res)
    dispatch(changeNewAlbumAction(res.albums))
  }
)

const rankingIds = [19723756, 3779629, 2884035]
export const fetchPlayListAction = createAsyncThunk(
  'play-list',
  (_, { dispatch }) => {
    // for (const id of rankingIds) {
    //   getPlayListDetail(id).then((res) => {
    //     console.log(res)
    //   })
    // }
    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
      promises.push(getPlayListDetail(id))
    }
    Promise.all(promises).then((res) => {
      const rankings = res.map((item) => item.playlist)
      dispatch(changeRankingsAction(rankings))
    })
  }
)

interface IRecommendState {
  banners: any[]
  hotRecommend: any[]
  newAlbums: any[]
  rankings: any[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommend: [],
  newAlbums: [],
  rankings: []
}

// redux保存数据
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommend = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbums = payload
    },
    changeRankingsAction(state, { payload }) {
      state.rankings = payload
    }
  }
})

export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeRankingsAction
} = recommendSlice.actions

export default recommendSlice.reducer
