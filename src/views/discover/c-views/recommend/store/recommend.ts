import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getBanners } from '../service/recommend'

// redux中请求异步数据，定义action
export const fetchBannersDataAction = createAsyncThunk(
  'banners',
  async (args, { dispatch }) => {
    // 将数据派发到banners上
    const res = await getBanners()
    dispatch(changeBannersAction(res.banners))
  }
)

interface IRecommendState {
  banners: any[]
}

const initialState: IRecommendState = {
  banners: []
}

// redux保存数据
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    }
  }
})

export const { changeBannersAction } = recommendSlice.actions

export default recommendSlice.reducer
