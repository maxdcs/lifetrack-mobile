import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "expo-router"
import HomeScreen from "../src/screens/Home/HomeScreen"

export default function Home() {
  const { token } = useSelector((state) => state.auth)

  if (!token) {
    return <Redirect href="/auth/login" />
  }

  return <HomeScreen />
}
