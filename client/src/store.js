import { configureStore } from '@reduxjs/toolkit'
import bugSlice from './redux-slices/bug.slice'
import projectSlice from './redux-slices/project.slice'
import userSlice from './redux-slices/user.slice'

export const store = configureStore({
  reducer: {
    bugSlice,
    projectSlice,
    userSlice
  },
})