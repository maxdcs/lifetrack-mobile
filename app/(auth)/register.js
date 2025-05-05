import React from "react"
import { Redirect } from "expo-router"
import { useSelector } from "react-redux"
import RegisterScreen from "../../src/screens/Auth/RegisterScreen"

export default function Register() {
  const { token } = useSelector((state) => state.auth)

  if (token) {
    return <Redirect href="/(tabs)" />
  }

  return <RegisterScreen />
}
