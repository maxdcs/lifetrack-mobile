import { createSlice, nanoid } from "@reduxjs/toolkit"

const getInitialState = () => {
  return {
    name: "",
    exercises: [],
    dirty: false,
  }
}

const editWorkoutFormSlice = createSlice({
  name: "editWorkoutForm",
  initialState: getInitialState(),
  reducers: {
    initializeWorkoutFormName: (state, action) => {
      state.name = action.payload
    },
    initializeWorkoutFormExercises: (state, action) => {
      state.exercises = action.payload
    },
    updateWorkoutFormName: (state, action) => {
      state.name = action.payload
      state.dirty = true
    },
    addExercisesToWorkoutForm: (state, action) => {
      const selectedExercises = action.payload

      const exercisesReadyToAdd = selectedExercises.map((e) => ({
        id: nanoid(),
        exerciseRef: e.id,
        name: e.name,
        muscleGroup: e.muscleGroup,
        plannedSets: 3,
        plannedReps: 10,
      }))

      state.exercises = [...state.exercises, ...exercisesReadyToAdd]
      state.dirty = true
    },
  },
})

export const { initializeWorkoutFormName, initializeWorkoutFormExercises, updateWorkoutFormName, addExercisesToWorkoutForm } =
  editWorkoutFormSlice.actions
export default editWorkoutFormSlice.reducer