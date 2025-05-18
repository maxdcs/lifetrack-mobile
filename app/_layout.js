import React, { useEffect } from "react"
import { Stack } from "expo-router"
import { Text, View, ActivityIndicator } from "react-native"
import { Provider, useSelector, useDispatch } from "react-redux"
import { StatusBar } from "expo-status-bar"
import { store } from "../src/store"
import {
  loadAuthToken,
  setCredentials,
  finishLoading,
} from "../src/features/authSlice"

function RootLayoutNav() { // Handles "is the auth state ready?"
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // Load token from secure store into redux store
  useEffect(() => {
    const loadTokenFromStorage = async () => {
      try {
        const storedToken = await loadAuthToken()
        if (storedToken) {
          dispatch(setCredentials(storedToken))
        } else {
          dispatch(finishLoading())
        }
      } catch (error) {
        console.log("Failed to load auth token:", error)
        dispatch(finishLoading())
      }
    }

    loadTokenFromStorage()
  }, [dispatch])

  // Display a loading spinner while token is being fetched from store
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#09EDFF" />
        <Text style={{ color: "white", marginTop: 10 }}>Loading...</Text>
      </View>
    )
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="workouts/[id]/edit" />
      </Stack>
    </>
  )
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  )
}
