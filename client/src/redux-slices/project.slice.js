import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('project')) || {
  _id: "",
  name: ""
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action) => {
      const project = action.payload;
      state = { ...state, _id: project._id };
      state = { ...state, name: project.name };
      localStorage.setItem('project', JSON.stringify(state))
    },
    getProject: (state, action) => {
      console.log(state)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProject, getProject } = projectSlice.actions

export default projectSlice.reducer