import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { loginApi } from "./features/login/loginApi"
import { usersApi } from "./features/users/usersApi"
import { workoutsApi } from "./features/workouts/workoutsApi"
import {exercisesApi} from "./features/exercises/exercisesApi"
import authReducer from "./features/auth/authSlice"


export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [workoutsApi.reducerPath]: workoutsApi.reducer,
    [exercisesApi.reducerPath]: exercisesApi.reducer,
    auth: authReducer,
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
