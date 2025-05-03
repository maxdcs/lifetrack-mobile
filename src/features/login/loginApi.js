import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../config"

export const loginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: (loginFormData) => {
          return {
            url: "/login",
            method: "POST",
            body: {
              email: loginFormData.email,
              password: loginFormData.password,
            },
          }
        },
      }),
    }
  },
})

export const { useLoginMutation } = loginApi
