import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('user')) || {
  isAuth: false,
  user: null,
  token: null 
} 

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload)
      const { user,token } = action.payload;
      state = {...state,user: user};
      state = {...state,token: token};
      if (user === null) {
          state = {...state, isAuth: false};
      } else {
          state = {...state, isAuth: true};
      }

      localStorage.setItem('user',JSON.stringify(state))
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer