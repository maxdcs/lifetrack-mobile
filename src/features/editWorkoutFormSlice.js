import {createSlice} from "@reduxjs/toolkit"


const getInitialState = () => {
  return {
    name: "",
    exercises: [],
    dirty: false
  }
}

const editWorkoutFormSlice = createSlice({
  name: "editWorkoutForm",
  initialState: getInitialState(),
  reducers: {
    setInitialWorkoutFormName: (state, action) => {
      state.name = action.payload
    },
    setInitialWorkoutFormExercises: (state, action) => {
      state.exercises = action.payload
    },
    setWorkoutFormName: (state, action) => {
      state.name = action.payload
      state.dirty = true
    },

  }
})