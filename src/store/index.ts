import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'
import recommednReducer from '@/views/discover/c-views/recommend/store/recommend'
import playerReducer from '@/views/player/store'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommednReducer,
    player: playerReducer
  }
})

type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
type TypeDispatch = typeof store.dispatch

export const useJcSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useJcDispatch: () => TypeDispatch = useDispatch

export default store
