import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "expo-router"
import StatisticsScreen from "../src/screens/Statistics/StatisticsScreen"

export default function Statistics() {
  const { token } = useSelector((state) => state.auth)

  if (!token) {
    return <Redirect href="/auth/login" />
  }

  return <StatisticsScreen />
}
