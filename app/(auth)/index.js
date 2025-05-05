import React from "react"
import { Redirect } from "expo-router"
import { useSelector } from "react-redux"
import LoginScreen from "../../src/screens/Auth/LoginScreen"

export default function Index() {
  const { token } = useSelector((state) => state.auth)

  if (token) {
    return <Redirect href="/(tabs)" />
  }

  return <LoginScreen />
}
