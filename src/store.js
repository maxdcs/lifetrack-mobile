import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { loginApi } from "./features/loginApi"
import { usersApi } from "./features/usersApi"
import { workoutsApi } from "./features/workoutsApi"
import { exercisesApi } from "./features/exercisesApi"
import authReducer from "./features/authSlice"
import editWorkoutFormReducer from "./features/editWorkoutFormSlice"


export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [workoutsApi.reducerPath]: workoutsApi.reducer,
    [exercisesApi.reducerPath]: exercisesApi.reducer,
    auth: authReducer,
    editWorkoutForm: editWorkoutFormReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      usersApi.middleware,
      workoutsApi.middleware,
      exercisesApi.middleware
    ),
})

setupListeners(store.dispatch)
