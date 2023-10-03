import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { dataSlice } from './slices/dataSlice'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

export const store = configureStore({
  reducer: dataSlice.reducer,
  devTools: !isProd,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(isDev ? [logger] : []),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
