import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "expo-router"
import RegisterScreen from "../../src/screens/Auth/RegisterScreen"

export default function Register() {
  const { token } = useSelector((state) => state.auth)

  if (token) {
    return <Redirect href="/" />
  }

  return <RegisterScreen />
}
