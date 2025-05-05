import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../config"

export const workoutsApi = createApi({
  reducerPath: "workouts",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) headers.set("authorization", `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ["Workout"],
  endpoints: (builder) => ({
    createNewWorkout: builder.mutation({
      query: (name) => ({
        url: "/workouts",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: [{ type: "Workout", id: "LIST" }],
    }),

    getUserWorkouts: builder.query({
      query: () => ({ url: "/workouts", method: "GET" }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({ type: "Workout", id })),
              { type: "Workout", id: "LIST" },
            ]
          : [{ type: "Workout", id: "LIST" }],
    }),

    getWorkoutById: builder.query({
      query: (workoutId) => ({ url: `/workouts/${workoutId}`, method: "GET" }),
      providesTags: (result, error, workoutId) => [
        { type: "Workout", id: workoutId },
      ],
    }),

    updateWorkoutById: builder.mutation({
      query: ({ workoutId, workoutFormData }) => ({
        url: `/workouts/${workoutId}`,
        method: "PUT",
        body: { workoutFormData },
      }),
      invalidatesTags: (result, error, { workoutId }) => [
        { type: "Workout", id: workoutId },
        { type: "Workout", id: "LIST" },
      ],
    }),

    deleteWorkoutWithId: builder.mutation({
      query: (workoutId) => ({
        url: `/workouts/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, workoutId) => [
        { type: "Workout", id: workoutId },
        { type: "Workout", id: "LIST" },
      ],
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