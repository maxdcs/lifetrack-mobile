import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../config"

export const workoutsApi = createApi({
  reducerPath: "workouts",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL, // Use centralized API URL
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    createNewWorkout: builder.mutation({
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Workout", id: "LIST" }]
      },
      query: (name) => {
        return {
          url: "/workouts",
          method: "POST",
          body: {
            name: name,
          },
        }
      },
    }),
    getUserWorkouts: builder.query({
      providesTags: (results) => {
        // If we have results, provide a tag for each workout plus a LIST tag
        if (results) {
          return [
            ...results.map(({ id }) => ({ type: "Workout", id })),
            { type: "Workout", id: "LIST" },
          ]
        }
        // If no results, just provide the LIST tag
        return [{ type: "Workout", id: "LIST" }]
      },
      query: () => ({
        url: "/workouts",
        method: "GET",
      }),
    }),
    getWorkoutById: builder.query({
      providesTags: (result, error, workoutId) => {
        return [{ type: "Workout", id: workoutId }]
      },
      query: (workoutId) => {
        return {
          url: `/workouts/${workoutId}`,
          method: "GET",
        }
      },
    }),
    updateWorkoutById: builder.mutation({
      query: (arg) => ({
        url: `/workouts/${arg.workoutId}`,
        method: "PUT",
        body: { workoutFormData: arg.workoutFormData },
      }),
    }),
    deleteWorkoutWithId: builder.mutation({
      invalidatesTags: (result, error, workoutId) => {
        return [
          { type: "Workout", id: workoutId },
          { type: "Workout", id: "LIST" },
        ]
      },
      query: (idOfWorkoutToDelete) => {
        return {
          url: `/workouts/${idOfWorkoutToDelete}`,
          method: "DELETE",
        }
      },
    }),
  }),
})

export const {
  useCreateNewWorkoutMutation,
  useGetUserWorkoutsQuery,
  useGetWorkoutByIdQuery,
  useUpdateWorkoutByIdMutation,
  useDeleteWorkoutWithIdMutation,
} = workoutsApi
