import { createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"
import * as SecureStore from "expo-secure-store"

const getInitialState = () => {
  return {
    token: null,
    userId: null,
    name: null,
    loading: true, // Start with loading true
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const token = action.payload
      if (token) {
        const decoded = jwtDecode(token)
        state.token = token
        state.userId = decoded.id
        state.name = decoded.name
      }
      state.loading = false
    },
    logout: (state) => {
      state.token = null
      state.userId = null
      state.name = null
      state.loading = false
    },
    finishLoading: (state) => {
      state.loading = false
    },
  },
})

export const { setCredentials, logout, finishLoading } = authSlice.actions
export default authSlice.reducer

// Helper functions for token management
export const saveAuthToken = async (token) => {
  await SecureStore.setItemAsync("auth_token", token)
}

export const loadAuthToken = async () => {
  return await SecureStore.getItemAsync("auth_token")
}

export const removeAuthToken = async () => {
  await SecureStore.deleteItemAsync("auth_token")
}
