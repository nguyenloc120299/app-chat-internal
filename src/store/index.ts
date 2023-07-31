import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import appReducer from "./app";
import userReducer from './user'
import chatReducer from './chat'

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    chat: chatReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export default store
