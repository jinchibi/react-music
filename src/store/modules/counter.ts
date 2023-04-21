import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    changeCountAction(state, { payload }: PayloadAction<number>) {
      state.count = payload
    }
  }
})

export const { changeCountAction } = counterSlice.actions
export default counterSlice.reducer
