import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../config"

export const usersApi = createApi({
  reducerPath: "users",
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
    getUserFromId: builder.query({
      query: (id) => `/users/${id}`,
    }),
    createNewUser: builder.mutation({
      query: (registerFormData) => {
        return {
          url: "/users",
          method: "POST",
          body: {
            name: registerFormData.name,
            email: registerFormData.email,
            password: registerFormData.password,
          },
        }
      },
    }),
  }),
})

export const { useGetUserFromIdQuery, useCreateNewUserMutation } = usersApi
